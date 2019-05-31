import {AuthService} from './auth.service';
import {TokenBearer} from '../models/auth';
import {NewUser} from '../models/user';
import {Observable, from, throwError} from 'rxjs';


describe('AuthService', () => {
  let authService: AuthService;
  let httpClientSpy;
  let routerSpy;
  let tokenSpy;
  const stubTokens: Observable<TokenBearer> = from([{token: '1', tokenRefresh: '2'}]);
  const stubUser = new NewUser('1', '2', '3');

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    authService = new AuthService(httpClientSpy, routerSpy);
    tokenSpy = spyOn(authService, 'storeTokens');
  });

  describe('login', () => {

    it('should call corresponding methods in it\'s body', () => {
      httpClientSpy.post.and.returnValue(stubTokens);

      authService.login(stubUser);

      expect(tokenSpy).toHaveBeenCalled();
      expect(httpClientSpy.post).toHaveBeenCalled();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['dashboard']);
    });
    it('should not change isLoggedIn state if an error is encountered', () => {
      httpClientSpy.post.and.callFake(() => {
        return throwError(new ErrorEvent('fake error'));
      });

      authService.login(stubUser);

      expect(tokenSpy).not.toHaveBeenCalled();
      expect(routerSpy.navigate).not.toHaveBeenCalled();
    });
  });

});
