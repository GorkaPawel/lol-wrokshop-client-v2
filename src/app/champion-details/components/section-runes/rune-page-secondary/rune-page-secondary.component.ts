import {Component, OnInit} from '@angular/core';
import {RunesAdapterService} from '../runes-adapter.service';
import {PathType, Rune, RunePath} from '../runes.model';
import {Observable, Subscription} from 'rxjs';
import {tap} from 'rxjs/internal/operators/tap';

@Component({
  selector: 'app-rune-page-secondary',
  templateUrl: './rune-page-secondary.component.html',
  styleUrls: ['./rune-page-secondary.component.scss']
})
export class RunePageSecondaryComponent implements OnInit {

  constructor(private runesService: RunesAdapterService) {
  }

  currentPath: RunePath;
  runeSlots: Array<Rune[]>;
  selectedRunes = Array<Rune>(2);
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
  }
  reset() {
    this.selectedRunes.fill(null);
    this.runeSlots = this.runesService.getRunesByPath(this.currentPath.path).slice(1);
  }

  isSelected(currentRune: Rune) {
    return this.selectedRunes.find((rune: Rune) => {
      return rune === currentRune;
    });
  }

  ngOnInit() {
    this.secondaryPaths$ = this.runesService.secondaryPaths$.pipe(
      tap((paths: RunePath[]) => {
        if (this.currentPath && !paths.includes(this.currentPath)) {
          this.currentPath = null;
        }
      })
    );
  }
}
