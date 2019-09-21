import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ApiItem} from '../../../../API/SERVER/api.model';
import {ModalControls} from '../../../models';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent extends ModalControls {

  constructor() {
    super();
  }

  @Input()
  set item(item: ApiItem) {
    if (item) {
      this._item = item;
      this.itemImg = `http://ddragon.leagueoflegends.com/cdn/9.3.1/img/item/${item.id}.png`;
    }
  }

  get item() {
    return this._item;
  }

  @Output() itemChange = new EventEmitter<ApiItem>();
  private _item: ApiItem;
  itemImg: string;

  update(event) {
    this.item = event;
    this.closeSpellDetails();
    this.itemChange.emit(this.item);
  }
}
