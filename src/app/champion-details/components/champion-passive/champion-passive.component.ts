import {ChangeDetectionStrategy, Component, Input, OnChanges} from '@angular/core';
import {Passive} from '../../../API/SERVER/api.model';
import {ApiService} from '../../../API/SERVER/api.service';

@Component({
  selector: 'champion-passive',
  templateUrl: './champion-passive.component.html',
  styleUrls: ['./champion-passive.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChampionPassiveComponent implements OnChanges {

  constructor(private api: ApiService) {
  }

  @Input()
  passive: Passive;

  @Input()
  name: string;

  passiveIconUrl;

  ngOnChanges() {
    if (this.passive) {
      this.passiveIconUrl = this.api.generateSpellImgUrl(this.passive.abilityIconPath, this.name);
    }
  }

}
