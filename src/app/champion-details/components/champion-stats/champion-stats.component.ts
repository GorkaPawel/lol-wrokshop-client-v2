import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {pluck} from 'rxjs/operators';
import {Stats} from '../../../API/SERVER/api.model';
import {SubSink} from 'subsink';

@Component({
  selector: 'champion-stats',
  templateUrl: './champion-stats.component.html',
  styleUrls: ['./champion-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChampionStatsComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute) {
  }
  subs = new SubSink();
  champStats: Stats;
  statImgUrl = 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/';
  ngOnInit() {
    this.subs.add(this.route.parent.data
      .pipe(
        pluck('champion', 'ApiChamp', 'stats'),
      )
      .subscribe((stats: Stats) => {
        this.champStats = stats;
      }));
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
