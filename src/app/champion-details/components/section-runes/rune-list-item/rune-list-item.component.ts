import {Component, Input, OnInit} from '@angular/core';
import {RunePage} from '../runes.model';

@Component({
  selector: 'app-rune-list-item',
  templateUrl: './rune-list-item.component.html',
  styleUrls: ['./rune-list-item.component.scss']
})
export class RuneListItemComponent implements OnInit {

  constructor() {
  }

  @Input() page: RunePage;

  ngOnInit() {
  }

}
