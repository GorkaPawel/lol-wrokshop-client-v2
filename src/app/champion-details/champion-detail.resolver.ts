import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';

import {of} from 'rxjs/internal/observable/of';
import {EMPTY, forkJoin, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {switchMap} from 'rxjs/internal/operators/switchMap';
import {ApiService} from '../API/SERVER/api.service';
import {DbService} from '../API/DB/db.service';
import {ChampionSources} from '../API/DB/db.model';
import {tap} from 'rxjs/internal/operators/tap';
import {ApiChampion} from '../API/SERVER/api.model';

@Injectable()
export class ChampionDetailResolver implements Resolve<ChampionSources> {
  constructor(
    private api: ApiService,
    private db: DbService,
    private router: Router
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<ChampionSources> | Observable<never> {

    const name = route.paramMap.get('id');
    const data = forkJoin([
      this.api.getChampion(name).pipe(tap((champion: ApiChampion) => {
        this.db.championId = champion.id;
      })),
      this.db.getChampion(name),
      this.api.getRunes()
  ]);

    return data.pipe(
      switchMap((DBandAPI) => {
        console.log('Champion array: ', DBandAPI);
        if (DBandAPI.length === 3) {
          const result = {ApiChamp: DBandAPI[0], DbChamp: DBandAPI[1], apiRunes: DBandAPI[2]};
          return of(result);
        } else {
          this.router.navigate(['/dashboard']);
          return EMPTY;
        }
      })
    );
  }
}
