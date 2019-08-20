import {Component, Input, OnInit} from '@angular/core';
import {Build} from '../../../../API/DB/db.model';

@Component({
  selector: 'app-build-list-item',
  templateUrl: './build-list-item.component.html',
  styleUrls: ['./build-list-item.component.scss']
})
export class BuildListItemComponent implements OnInit {

  constructor() {
  }

  @Input()
  build: Build;
  itemUrl = 'http://ddragon.leagueoflegends.com/cdn/9.3.1/img/item/';
  ngOnInit() {
  }

}
