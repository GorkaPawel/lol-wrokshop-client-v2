import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {NotificationService} from './notification.service';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class ErrorsHandler implements ErrorHandler {
  constructor(private injector: Injector) {
  }

  handleError(error: any): void {

    const notificationService = this.injector.get(NotificationService);
    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        console.error('No internet connection');
      } else {
        notificationService.errorMessages$.next(error.error);
      }
    } else {
      console.error(error);
    }
  }
}
