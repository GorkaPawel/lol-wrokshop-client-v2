import {Component, OnDestroy} from '@angular/core';
import {RunesAdapterService} from '../runes-adapter.service';
import {Rune, RunePage, RunePath} from '../runes.model';
import {ActivatedRoute, Router} from '@angular/router';
import {RunesStateService} from '../runes-state.service';
import {DbService} from '../../../../API/DB/db.service';
import {SubSink} from 'subsink';

@Component({
  selector: 'app-runes-edit',
  templateUrl: './runes-edit.component.html',
  styleUrls: ['./runes-edit.component.scss'],
  providers: [RunesStateService]
})
export class RunesEditComponent implements OnDestroy {

  constructor(
    private state: RunesStateService,
    private router: Router,
    private runesAdapter: RunesAdapterService,
    private route: ActivatedRoute,
    private db: DbService) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.pageToEdit = this.router.getCurrentNavigation().extras.state.data;
    }
  }

  set pageToEdit(page: RunePage) {
    if (!page) {
      return;
    }
    this.primaryState = {primaryPath: page.primaryPath, primaryRunes: page.primaryRunes};
    this.secondaryState = {secondaryPath: page.secondaryPath, secondaryRunes: page.secondaryRunes};
    this.pageName = page.pageName;
    this._id = page._id;
  }
  subs = new SubSink();
  errorModalOpened = false;
  pageName: string;
  _id: string;
  primaryState: { primaryPath: RunePath, primaryRunes: Rune[] };
  secondaryState: { secondaryPath: RunePath, secondaryRunes: Rune[] };

  onPrimaryState(primaryState: { primaryPath: RunePath, primaryRunes: Rune[] }) {
    this.primaryState = primaryState;
  }

  onSecondaryState(secondaryState: { secondaryPath: RunePath, secondaryRunes: Rune[] }) {
    this.secondaryState = secondaryState;
  }
  toggleError() {
    this.errorModalOpened = !this.errorModalOpened;
  }
  saveRunePage() {
    if (!this.pageName ||
      !this.primaryState ||
      !this.secondaryState ||
      this.primaryState.primaryRunes.includes(null) ||
      this.secondaryState.secondaryRunes.includes(null)) {
      return this.toggleError();
    }
    const page = {
      _id: this._id,
      pageName: this.pageName,
      primaryPath: this.primaryState.primaryPath,
      primaryRunes: this.primaryState.primaryRunes,
      secondaryPath: this.secondaryState.secondaryPath,
      secondaryRunes: this.secondaryState.secondaryRunes
    };
    this.subs.add(this.db.updateRunes(page).subscribe(response => {
      this.route.parent.parent.snapshot.data.champion.DbChamp.runes = response;
      this.navigate();
    }));
  }
  navigate() {
    const id = this.route.parent.parent.snapshot.paramMap.get('id');
    this.router.navigate(['dashboard', 'champion', id, {outlets: {builds: 'runes'}}]);
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
