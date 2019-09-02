import {ChangeDetectionStrategy, Component, Input, OnChanges} from '@angular/core';
import {Passive} from '../../../API/SERVER/api.model';
import {ApiService} from '../../../API/SERVER/api.service';
import {ModalControls} from '../../models';

@Component({
  selector: 'champion-passive',
  templateUrl: './champion-passive.component.html',
  styleUrls: ['./champion-passive.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChampionPassiveComponent extends ModalControls implements OnChanges {

  constructor(private api: ApiService) {
    super();
  }

  @Input()
  passive: Passive;

  @Input()
  name: string;

  passiveIconUrl;
  spellVideoUrl = 'https://d28xe8vt774jo5.cloudfront.net/';

  ngOnChanges() {
    if (this.passive) {
      this.passiveIconUrl = this.api.generateSpellImgUrl(this.passive.abilityIconPath, this.name);
    }
  }

}
