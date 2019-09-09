import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RunePage} from '../runes.model';
import cloneDeep from 'lodash.clonedeep';

@Component({
  selector: 'app-runes-list',
  templateUrl: './runes-list.component.html',
  styleUrls: ['./runes-list.component.scss']
})
export class RunesListComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  runePages: RunePage[];
  edit(page: RunePage) {
    const pageClone = cloneDeep(page);
    this.navigate(pageClone);
  }


  navigate(data?: RunePage) {
    const id = this.route.parent.parent.snapshot.paramMap.get('id');
    this.router.navigate(['dashboard', 'champion', id, {outlets: {builds: ['runes', 'edit']}}],
      {
        state: {
          data,
        },
      });
  }
  ngOnInit() {
      this.runePages = this.runePages = this.route.parent.parent.snapshot.data.champion.DbChamp.runes;
    }
}
