import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {ErrorHandler, Injectable} from '@angular/core';
import {catchError, filter, switchMap, take} from 'rxjs/operators';

import {TokenBearer} from '../models/auth';
import {AuthService} from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private refreshTokenInProgress$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private authService: AuthService,
    private errorHandler: ErrorHandler,

  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = this.addAuthHeader(req);

    return next.handle(clonedRequest).pipe(
      catchError((error) => {
        // if error isn't 403 then rethrow
        if (error.status !== 403) {
          return throwError(error);
        }
        // if 403 error and token is being refreshed, schedule request or sth
        if (this.refreshTokenInProgress$.getValue()) {
          return this.handleRequestAfterRefresh(clonedRequest, next);
        }
        // if 403 error and token hasn't started refreshing yet, go ahead and start the process
        return this.refreshToken().pipe(
          // here goes the vale of Bearer received upon refreshing
          // get the value, unsubscribe then start new
          switchMap(() => this.retryRequest(clonedRequest, next)),
          // refresh token could expire to here its get handled
          catchError(err => this.handleAuthorizationError(err))
        );
      })
    );
  }

  private retryRequest(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.refreshTokenInProgress$.next(false);
    return next.handle(this.addAuthHeader(request));
  }

  private handleRequestAfterRefresh(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // block requests until refreshing state changes
    return this.refreshTokenInProgress$
      .pipe(
        filter(x => !x),
        take(1),
        switchMap(() => next.handle(this.addAuthHeader(request)))
      );
  }

  private refreshToken(): Observable<TokenBearer> {
    // set token refreshing to true
    this.refreshTokenInProgress$.next(true);
    // this returns a stream that either resolves to BearerModel object or authService error
    // probably caused by refresh token expiry
    return this.authService.refreshToken();
  }

  private handleAuthorizationError(error): Observable<HttpEvent<any>> {
    // token couldn't be refreshed therefore clean storage and log out
    this.refreshTokenInProgress$.next(false);
    this.authService.logout();
    return throwError(error);
  }

  private addAuthHeader(request: HttpRequest<any>): HttpRequest<any> {
    // if token is present in local storage go ahead and append authheader with it
    const token = this.authService.getToken();
    if (!token) {
      return request;
    }
    // if not just pass the unchanged request
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
