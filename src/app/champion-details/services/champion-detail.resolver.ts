import {Champ} from '../../shared/models/champions';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {ChampionsDataService} from '../../shared/services/champions-data.service';
import {mergeMap, take} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {EMPTY, Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class ChampionDetailResolver implements Resolve<Champ> {
  constructor(
    private champService: ChampionsDataService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Champ> | Observable<never> {

    const id = route.paramMap.get('id');
    return this.champService.getChampion(id).pipe(
      take(1),
      mergeMap((champion: Champ) => {
        if (champion) {
          return of(champion);
        } else {
          this.router.navigate(['/dashboard']);
          return EMPTY;
        }
      })
    );
  }
}
