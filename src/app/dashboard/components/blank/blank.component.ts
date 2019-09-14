import { Component } from '@angular/core';
import {DbService} from '../../../API/DB/db.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.scss']
})
export class BlankComponent {

  constructor(private db: DbService, private router: Router) {
  }
  gotToDetails(champ: {name: string}) {
    this.router.navigate(['dashboard', 'champion', champ.name]);
  }
  championList$ = this.db.getChampionList();
  baseUrl = 'https://cdn.communitydragon.org/latest/champion/';
}
