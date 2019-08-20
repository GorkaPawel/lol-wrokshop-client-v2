import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {pluck} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {Stats} from '../../../API/SERVER/api.model';

@Component({
  selector: 'champion-stats',
  templateUrl: './champion-stats.component.html',
  styleUrls: ['./champion-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChampionStatsComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
  }

  champStats: Stats;
  champSub: Subscription;

  ngOnInit() {
    this.champSub = this.route.parent.data
      .pipe(
        pluck('champion', 'ApiChamp', 'stats'),
      )
      .subscribe((stats: Stats) => {
        this.champStats = stats;
      });
  }
}
