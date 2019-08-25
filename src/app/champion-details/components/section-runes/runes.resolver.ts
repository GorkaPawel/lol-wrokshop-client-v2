import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';

import {Injectable} from '@angular/core';
import {ApiService} from '../../../API/SERVER/api.service';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RunesResolver implements Resolve<any> {
  constructor(
    private api: ApiService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.api.getRunes();
  }
}
