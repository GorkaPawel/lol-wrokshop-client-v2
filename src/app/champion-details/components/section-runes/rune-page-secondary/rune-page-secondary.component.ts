import {Component, DoCheck, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RunesAdapterService} from '../runes-adapter.service';
import {Rune, RunePath} from '../runes.model';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/internal/operators/tap';
import {RunesStateService} from '../runes-state.service';

@Component({
  selector: 'app-rune-page-secondary',
  templateUrl: './rune-page-secondary.component.html',
  styleUrls: ['./rune-page-secondary.component.scss']
})
export class RunePageSecondaryComponent implements OnInit, DoCheck {

  constructor(private runesService: RunesAdapterService, private runeState: RunesStateService) {
  }

  currentPath: RunePath;
  selectedRunes = Array<Rune>(2);

  @Input() set state(secondaryState: { secondaryPath: RunePath, secondaryRunes: Rune[] }) {
    if (secondaryState) {
      this.currentPath = secondaryState.secondaryPath;
      this.selectedRunes = secondaryState.secondaryRunes;
    }
  }

  @Output() pageState = new EventEmitter<{ secondaryPath: RunePath, secondaryRunes: Rune[] }>();

  runeSlots: Array<Rune[]>;
  pathSelectionOpened = false;
  runeSelectionOpen = false;
  sourceIndex: number;
  secondaryPaths$: Observable<RunePath[]>;

  togglePathSelection() {
    this.pathSelectionOpened = !this.pathSelectionOpened;
  }

  toggleRuneSelection(sourceIndex?: number) {
    this.sourceIndex = sourceIndex;
    this.runeSelectionOpen = !this.runeSelectionOpen;
  }

  select(item: Rune | RunePath) {
    if (item instanceof Rune) {
      this.selectedRunes[this.sourceIndex] = item;
      this.toggleRuneSelection();
    }
    if (item instanceof RunePath) {
      this.currentPath = item;
      this.togglePathSelection();
      this.reset();
    }
    this.emitState();
  }

  emitState() {
    const isRunesNotFilled = this.selectedRunes.includes(undefined);
    if (this.currentPath && !isRunesNotFilled) {
      this.pageState.emit({secondaryPath: this.currentPath, secondaryRunes: this.selectedRunes});
    }
  }

  reset() {
    this.selectedRunes.fill(null);
    this.getSlots();
  }

  isSelected(currentRune: Rune) {
    return this.selectedRunes.find((rune: Rune) => {
      return rune === currentRune;
    });
  }

  getSlots() {
    this.runeSlots = this.runesService.getRunesByPath(this.currentPath.path).slice(1);
  }

  ngOnInit() {
    this.secondaryPaths$ = this.runeState.secondaryPaths$.pipe(
      tap((paths: RunePath[]) => {
        if (this.currentPath && !paths.includes(this.currentPath)) {
          this.currentPath = null;
        }
      })
    );
  }

  ngDoCheck() {
    if (this.currentPath) {
      this.getSlots();
    }
  }
}
