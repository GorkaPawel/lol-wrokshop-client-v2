import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {ApiItem} from '../../../../API/SERVER/api.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnChanges, OnInit, OnDestroy {

  constructor() {
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
  itemDialog = false;
  update(event) {
    this.item = event;
    console.log(event);
    this.itemChange.emit(this.item);
  }
  close() {
    this.itemDialog = false;
  }
  open(event) {
    event.stopPropagation();
    this.itemDialog = true;
  }
  ngOnChanges(changes) {
    console.log('on changes: ', changes);
  }
  ngOnInit(): void {
    console.log('component initialized');
  }
  ngOnDestroy(): void {
    console.log('component destroyed');
  }
}
