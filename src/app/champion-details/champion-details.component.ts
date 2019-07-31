import {Component, OnDestroy, OnInit} from '@angular/core';
import {Champ} from '../shared/models/champions';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-champion-details',
  template: `
    <h1>{{champion.name}}</h1>
    <h2>{{champion.title}}</h2>
    <nav>
      <ul>
        <li>skins</li>
        <li>history</li>
      </ul>
    </nav>
    <router-outlet></router-outlet>
    <champion-stats [champStats]="champion.stats"></champion-stats>
    <champion-passive
      [passive]="champion.passive"
      [name]="champion.id"
    ></champion-passive>
    <champion-spell
      *ngFor="let spell of champion.spells"
      [spell]="spell"
      [name]="champion.id"
    >
    </champion-spell>

  `,
  styles: [`
    nav {
      border: 2px solid pink;
    }

    ul {
      display: flex;
      width: 50vw;
      justify-content: space-around;
    }

    ul li {
      border: 1px solid green;
      list-style-type: none;
    }
  `]
})

export class ChampionDetailsComponent implements OnInit, OnDestroy {
  private champion: Champ;
  private champSub: Subscription;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.champSub = this.route.data
      .subscribe((data: { champion: Champ }) => {
        this.champion = data.champion;
      });
  }

  ngOnDestroy() {
    this.champSub.unsubscribe();
  }
}
