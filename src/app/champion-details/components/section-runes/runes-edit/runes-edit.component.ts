import {Component} from '@angular/core';
import {RunesAdapterService} from '../runes-adapter.service';
import {Rune, RunePage, RunePath} from '../runes.model';
import {ActivatedRoute, Router} from '@angular/router';
import {RunesStateService} from '../runes-state.service';
import {DbService} from '../../../../API/DB/db.service';

@Component({
  selector: 'app-runes-edit',
  templateUrl: './runes-edit.component.html',
  styleUrls: ['./runes-edit.component.scss'],
  providers: [RunesStateService]
})
export class RunesEditComponent {

  constructor(
    private router: Router,
    private runesAdapter: RunesAdapterService,
    private route: ActivatedRoute,
    private db: DbService) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.pageToEdit = this.router.getCurrentNavigation().extras.state.page;
    }
  }

  set pageToEdit(page: RunePage) {
    this.primaryState = {primaryPath: page.primaryPath, primaryRunes: page.primaryRunes};
    this.secondaryState = {secondaryPath: page.secondaryPath, secondaryRunes: page.secondaryRunes};
    this.pageName = page.pageName;
    this._id = page._id;
  }

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

  saveRunePage() {
    if (this.secondaryState && this.primaryState && this.pageName) {
      const page = {
        _id: this._id,
        pageName: this.pageName,
        primaryPath: this.primaryState.primaryPath,
        primaryRunes: this.primaryState.primaryRunes,
        secondaryPath: this.secondaryState.secondaryPath,
        secondaryRunes: this.secondaryState.secondaryRunes
      };
      this.db.updateRunes(page).subscribe(response => {
        this.route.parent.parent.snapshot.data.champion.DbChamp.runes = response;
        const id = this.route.parent.parent.snapshot.paramMap.get('id');
        this.router.navigate(['dashboard', 'champion', id, {outlets: {builds: 'runes'}}]);
      });
    } else {
      alert('fill all fields');
    }
  }
}
