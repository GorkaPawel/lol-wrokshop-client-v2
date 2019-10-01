import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthGuard} from './auth.guard';
import {AuthService} from './auth.service';

@Injectable({providedIn: 'root'})
export class NegateAuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.authService.getToken()) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}
