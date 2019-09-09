import {Component, Input, OnInit} from '@angular/core';
import {isRune, Rune, RunePath} from '../runes.model';

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
    if (!item) {
    } else if (isRune(item)) {
      this.displayPath = false;
      this.displayRune = true;
    } else {
      this.displayPath = true;
      this.displayRune = false;
      const path = item.path.toLowerCase()[0];
      this.pathVfx = `${this.basePath}vfx-${path}.png`;
      this.pathIcon = `${this.basePath}icon-${path}.png`;
    }
    this._item = item;
  }

  get item(): RunePath | Rune {
    return this._item;
  }

  private _item: RunePath | Rune;
  displayRune = false;
  displayPath = false;

  pathIcon: string;
  pathVfx: string;
  readonly basePath = '/assets/';

  ngOnInit() {
  }

}
