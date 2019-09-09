import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {RunePage} from '../runes.model';

@Component({
  selector: 'app-rune-list-item',
  templateUrl: './rune-list-item.component.html',
  styleUrls: ['./rune-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RuneListItemComponent {

  constructor() {
  }

  private _page: RunePage;
  @Input() set page(page: RunePage) {
    this._page = page;
    const primaryPath = page.primaryPath.path.toLowerCase();
    this.mainPathUrl = `${this.mainPathBaseUrl}${primaryPath}/inventory_card.jpg`;
  }

  get page() {
    return this._page;
  }

  mainPathUrl: string;
  mainPathBaseUrl = 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-perks/global/default/images/';
}
