import {Injectable} from '@angular/core';
import {PathType, Rune, RunePath} from './runes.model';


@Injectable()
export class RunesAdapterService {

  constructor() {
  }

  private _runePaths: RunePath[] = [];
  private runes: Rune[] = [];
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
