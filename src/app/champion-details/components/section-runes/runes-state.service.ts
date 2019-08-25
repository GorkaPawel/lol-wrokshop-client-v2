import {Injectable} from '@angular/core';
import {Rune, RunePage, RunePath} from './runes.model';
import {BehaviorSubject} from 'rxjs';
import {scan} from 'rxjs/internal/operators/scan';

enum Actions {
  updatePrimaryPath,
  updateSecondaryPath,
  updatePrimaryRunes,
  updateSecondaryRunes
}

export interface Action {
  payload: RunePath | Rune[] | RunePage;
  action: Actions;
}

@Injectable()
export class RunesStateService {

  constructor() {
  }

  actions = Actions;
  private defaultState: RunePage = {
    primaryPath: null,
    primaryRunes: [],
    secondaryPath: null,
    secondaryRunes: [],
  };
  private runeState$ = new BehaviorSubject<Action>({payload: this.defaultState, action: null});

  runeStore$ = this.runeState$.pipe(
    scan((acc: Action, newValue: Action) => {
      // merge somehow whatever comes here to current state
      switch (newValue.action) {
        case this.actions.updatePrimaryPath: {
          return {...acc.payload,  primaryPath: newValue.payload};
        }
        case this.actions.updateSecondaryPath: {
          return {...acc.payload,  secondaryPath: newValue.payload};
        }
        case this.actions.updatePrimaryRunes: {
          return {...acc.payload, primaryRunes: newValue.payload};
        }
        case this.actions.updateSecondaryRunes: {
          return {...acc.payload, secondaryRunes: newValue.payload};
        }
        default: {
          return {...acc};
        }
      }
    }, {payload: this.defaultState, action: null})
  );
  updateStore(payload: any, action: Actions) {
    this.runeState$.next({payload, action});
  }
}
