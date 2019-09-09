import {Component, DoCheck, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {RunesAdapterService} from '../runes-adapter.service';
import {isRune, Rune, RunePath} from '../runes.model';
import {RunesStateService} from '../runes-state.service';
import {SubSink} from 'subsink';

@Component({
  selector: 'app-rune-page-secondary',
  templateUrl: './rune-page-secondary.component.html',
  styleUrls: ['./rune-page-secondary.component.scss']
})
export class RunePageSecondaryComponent implements OnInit, DoCheck, OnDestroy {

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
  availablePaths: RunePath[] = [];
  subs = new SubSink();


  togglePathSelection() {
    this.pathSelectionOpened = !this.pathSelectionOpened;
  }

  toggleRuneSelection(sourceIndex?: number) {
    this.sourceIndex = sourceIndex;
    this.runeSelectionOpen = !this.runeSelectionOpen;
  }

  select(item: Rune | RunePath) {
    if (isRune(item)) {
      this.selectedRunes[this.sourceIndex] = item;
      this.toggleRuneSelection();
    } else {
      this.currentPath = item;
      this.togglePathSelection();
      this.reset();
    }
    this.emitState();
  }

  emitState() {
    this.pageState.emit({secondaryPath: this.currentPath, secondaryRunes: this.selectedRunes});
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
    this.subs.add(this.runeState.secondaryPaths$.subscribe((paths: RunePath[]) => {
      this.availablePaths = paths;
      if (!this.currentPath) {
        return;
      }
      const includes = this.availablePaths.some((path: RunePath) => {
        return path.path === this.currentPath.path;
      });
      if (!includes) {
        this.runeSelectionOpen = false;
        this.currentPath = null;
      }
    }));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngDoCheck() {
    if (this.currentPath) {
      this.getSlots();
    }
  }
}
