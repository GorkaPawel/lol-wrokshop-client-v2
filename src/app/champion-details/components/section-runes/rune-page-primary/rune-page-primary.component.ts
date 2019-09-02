import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Rune, RunePath} from '../runes.model';
import {RunesAdapterService} from '../runes-adapter.service';
import {Subscription} from 'rxjs';
import {RunesStateService} from '../runes-state.service';

@Component({
  selector: 'app-rune-page-primary',
  templateUrl: './rune-page-primary.component.html',
  styleUrls: ['./rune-page-primary.component.scss']
})
export class RunePagePrimaryComponent implements OnInit, OnDestroy {

  constructor(private runesService: RunesAdapterService, private runeState: RunesStateService) {
  }

  private sub1: Subscription;
  private sub2: Subscription;

  @Input() set state(primaryState: { primaryPath: RunePath, primaryRunes: Rune[] }) {
    if (primaryState) {
      this.runeState.currentPrimaryPath$.next(primaryState.primaryPath);
      this.selectedRunes = primaryState.primaryRunes;
    }
  }

  @Output() pageState = new EventEmitter<{ primaryPath: RunePath, primaryRunes: Rune[] }>();

  currentPath: RunePath;
  selectedRunes = Array<Rune>(4);

  runeSlots: Array<Rune[]>;
  slotSelectionOpened = Array<boolean>(4).fill(false);
  pathSelectionOpened = false;


  toggleSelection(index?: number) {
    if (index !== undefined) {
      this.slotSelectionOpened[index] = !this.slotSelectionOpened[index];
    } else {
      this.pathSelectionOpened = !this.pathSelectionOpened;
    }
  }

  select(item: Rune | RunePath, index?: number) {
    if (item instanceof Rune) {
      this.selectedRunes[item.slot] = item;
      this.toggleSelection(index);
    }
    if (item instanceof RunePath) {
      this.selectedRunes.fill(null);
      this.runeState.currentPrimaryPath$.next(item);
      this.toggleSelection();
    }
    this.emitState();
  }

  emitState() {
    if (this.currentPath && !this.selectedRunes.some((rune: Rune) => !!rune === false)) {
      this.pageState.emit({primaryPath: this.currentPath, primaryRunes: this.selectedRunes});
    }
  }

  isSelected(currentRune: Rune) {
    return this.selectedRunes.find((rune: Rune) => {
      return rune && rune.key === currentRune.key;
    });
  }

  ngOnInit() {
    this.sub1 = this.runeState.itemsByPath$.subscribe(items => {
      this.runeSlots = items;
    });
    this.sub2 = this.runeState.currentPrimaryPath$.subscribe((path: RunePath) => {
      this.currentPath = path;
    });
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
}
