import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthGuard} from './auth.guard';

@Injectable({providedIn: 'root'})
export class NegateAuthGuard implements CanActivate {

  constructor(private router: Router, private authGuard: AuthGuard) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return !this.authGuard.canActivate(route, state);
  }
}
