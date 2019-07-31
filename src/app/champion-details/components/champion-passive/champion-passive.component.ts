import {ChangeDetectionStrategy, Component, DoCheck, Input, OnChanges} from '@angular/core';
import {Passive} from '../../../shared/models/champions';
import {ChampionsDataService} from '../../../shared/services/champions-data.service';

@Component({
  selector: 'champion-passive',
  templateUrl: './champion-passive.component.html',
  styleUrls: ['./champion-passive.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChampionPassiveComponent implements OnChanges {

  constructor(private champService: ChampionsDataService) {
  }

  @Input()
  passive: Passive;

  @Input()
  name: string;

  passiveIconUrl;

  ngOnChanges() {
    if (this.passive) {
      this.passiveIconUrl = this.champService.generateSpellImgUrl(this.passive.abilityIconPath, this.name);
    }
  }

}
