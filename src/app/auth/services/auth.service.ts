import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ExistingUser, NewUser} from '../models/user';
import {TokenBearer} from '../models/auth';
import {Router} from '@angular/router';


const URL = 'http://localhost:8080';
const TOKEN = 'TOKEN';
const REFRESH_TOKEN = 'REFRESH_TOKEN';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // TODO error handler
  register(newUser: NewUser) {
    this.http.post<any>(`${URL}/register`, newUser).subscribe(
      () => this.router.navigate(['']),
      err => {
        console.log(err.error);
      }
    );
  }

  login(existingUser: ExistingUser) {
    this.http.post<TokenBearer>(`${URL}/login`, existingUser)
      .subscribe(
        (tokens: TokenBearer) => {
          this.storeTokens(tokens);
          this.router.navigate(['dashboard']);
        },
        error => {
          console.log(error);
        });
  }

  logout() {
    this.http.post<any>(`${URL}/logout`, null)
      .subscribe(() => {
        this.removeTokens();
        this.router.navigate(['']);
      });
  }

  refreshToken(): Observable<TokenBearer> {
    return this.http.post<TokenBearer>(`${URL}/refresh`, {tokenRefresh: this.getTokenRefresh()});
  }

  storeTokens(tokens: TokenBearer) {
    localStorage.setItem(TOKEN, tokens.token);
    localStorage.setItem(REFRESH_TOKEN, tokens.tokenRefresh);
  }

  removeTokens() {
    localStorage.clear();
  }

  getToken(): string {
    return localStorage.getItem(TOKEN);
  }

  private getTokenRefresh() {
    return localStorage.getItem(REFRESH_TOKEN);
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }
}
