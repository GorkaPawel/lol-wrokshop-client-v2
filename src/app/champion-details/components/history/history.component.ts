import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiChampion} from '../../../API/SERVER/api.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
  }

  champion: ApiChampion;

  ngOnInit() {
    this.champion = this.route.parent.snapshot.data.champion.ApiChamp;
  }

}
