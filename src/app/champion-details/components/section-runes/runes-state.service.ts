import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {RunePath} from './runes.model';
import {map} from 'rxjs/operators';
import {RunesAdapterService} from './runes-adapter.service';

@Injectable()
export class RunesStateService {

  constructor(private adapter: RunesAdapterService) {
  }


  currentPrimaryPath$ = new BehaviorSubject<RunePath>(new RunePath({key: 'Domination', icon: 'blank'}));
  itemsByPath$ = this.currentPrimaryPath$
    .pipe(
      map((path: RunePath) => {
        if (path) {
          return this.adapter.getRunesByPath(path.path);
        }
        return [];
      })
    );
  secondaryPaths$ = this.currentPrimaryPath$
    .pipe(
      map((path: RunePath) => {
        if (path) {
          return this.adapter.runePaths.filter((runePath: RunePath) => {
            return runePath.path !== path.path;
          });
        }
        return this.adapter.runePaths;
      })
    );
}
