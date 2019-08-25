import {Component, Input, OnInit} from '@angular/core';
import {Rune, RunePath} from '../runes.model';

@Component({
  selector: 'app-keystone',
  templateUrl: './keystone.component.html',
  styleUrls: ['./keystone.component.scss']
})
export class KeystoneComponent implements OnInit {

  constructor() {
  }

  @Input()
  set item(item: RunePath | Rune) {
    if (item instanceof RunePath) {
      this.displayPath = true;
      this.displayRune = false;
    } else {
      this.displayPath = false;
      this.displayRune = true;
    }
    this._item = item;
  }
  get item(): RunePath | Rune {
    return this._item;
  }
  private _item: RunePath | Rune;
  displayRune = false;
  displayPath = false;

  ngOnInit() {
  }

}
