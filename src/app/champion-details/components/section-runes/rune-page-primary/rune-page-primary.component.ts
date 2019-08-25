import {Component, OnDestroy, OnInit} from '@angular/core';
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

  constructor(private runesService: RunesAdapterService, private runeStore: RunesStateService) {
  }

  private sub1: Subscription;
  private sub2: Subscription;

  currentPath: RunePath;
  runeSlots: Array<Rune[]>;
  slotSelectionOpened = Array<boolean>(4).fill(false);
  selectedRunes = Array<Rune>(4);
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
      // this.runeStore.updateStore(this.selectedRunes, this.runeStore.actions.updatePrimaryRunes);
    }
    if (item instanceof RunePath) {
      this.runesService.currentPrimaryPath$.next(item);
      this.toggleSelection();
    }
  }
  isSelected(currentRune: Rune) {
    return this.selectedRunes.find((rune: Rune) => {
      return rune === currentRune;
    });
  }
  ngOnInit() {
    this.sub1 = this.runesService.itemsByPath$.subscribe(items => {
      // any time time current item set changes, reset chosen items;
      this.selectedRunes.fill(null);
      this.runeSlots = items;
    });
    this.sub2 = this.runesService.currentPrimaryPath$.subscribe((path: RunePath) => {
      this.currentPath = path;
    });
    console.log(this.slotSelectionOpened);
    console.log(this.selectedRunes);
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
}
