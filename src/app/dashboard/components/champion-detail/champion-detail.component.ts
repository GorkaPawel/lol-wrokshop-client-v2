import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ChampionsDataService} from '../../services/champions-data.service';
import {switchMap} from 'rxjs/internal/operators/switchMap';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-champion-detail',
  templateUrl: './champion-detail.component.html',
  styleUrls: ['./champion-detail.component.scss']
})
export class ChampionDetailComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private champService: ChampionsDataService) {
  }

  champion = null;
  champSub: Subscription;


  ngOnInit() {
    this.champSub = this.route.paramMap.pipe(
      switchMap(params => {
        return this.champService.getChampion(params.get('id'));
      })
    )
      .subscribe(champion => {
        this.champion = champion;
        console.log('Champ detail component: got champion - ', this.champion);
      });
  }
  ngOnDestroy() {
    this.champSub.unsubscribe();
  }

}
