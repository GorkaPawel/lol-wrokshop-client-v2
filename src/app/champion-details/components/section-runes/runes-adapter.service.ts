import {Injectable} from '@angular/core';
import {PathType, Rune, RunePath} from './runes.model';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable()
export class RunesAdapterService {

  constructor() {
  }

  private _runePaths: RunePath[] = [];
  private runes: Rune[] = [];

  currentPrimaryPath$ = new BehaviorSubject<RunePath>(null);
  itemsByPath$ = this.currentPrimaryPath$
    .pipe(
      map((path: RunePath) => {
        if (path) {
          return this.getRunesByPath(path.path);
        }
        return [];
      })
    );
  secondaryPaths$ = this.currentPrimaryPath$
    .pipe(
      map((path: RunePath) => {
        if (path) {
          return this.runePaths.filter((runePath: RunePath) => {
            return runePath.path !== path.path;
          });
        }
        return this.runePaths;
      })
    );


  storeRunes(runes: any[]) {
    if (!this._runePaths.length || !this.runes.length) {
      for (const path of runes) {
        this._runePaths.push(new RunePath(path));
        // paths here contains object with slots[runes[]]
        path.slots.forEach((slot, index) => {
          slot.runes.forEach(rune => {
            this.runes.push(new Rune(path.key, index, rune));
          });
        });
      }
    }
    console.log('second time not setting: ', this.runePaths);
    console.log('second time not setting: ', this.runes);
  }

  get runePaths() {
    return this._runePaths;
  }

  getRunesByPath(path: PathType): Array<Rune[]> {
    const items = [[], [], [], []];
    const filtered = this.runes.filter((rune: Rune) => {
      return rune.path === path;
    });
    if (filtered.length) {
      filtered.forEach((rune: Rune) => {
        items[rune.slot].push(rune);
      });
    }
    return items;
  }
}
