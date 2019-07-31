import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Stats} from '../../../shared/models/champions';

@Component({
  selector: 'champion-stats',
  templateUrl: './champion-stats.component.html',
  styleUrls: ['./champion-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChampionStatsComponent {

  constructor() {
  }

  @Input()
  champStats: Stats;
}
