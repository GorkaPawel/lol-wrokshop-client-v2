import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ApiService} from '../../../API/SERVER/api.service';
import {ID} from '../../../API/SERVER/api.model';

@Component({
  selector: 'app-champion-search',
  templateUrl: './champion-search.component.html',
  styleUrls: ['./champion-search.component.scss']
})
export class ChampionSearchComponent implements AfterViewInit, OnDestroy {
  constructor(private api: ApiService, private router: Router) {
  }

  @ViewChild('search') searchRef: ElementRef;
  results: ID[];
  subscription: Subscription;

  close() {
    this.results = [];
  }

  goToDetails(championName: string) {
    this.close();
    this.router.navigate(['dashboard/champion/' + championName]);
  }

  ngAfterViewInit() {
    this.subscription = fromEvent((this.searchRef.nativeElement as HTMLInputElement), 'input')
      .pipe(
        debounceTime(400),
        map((event) => {
          const term = event.target['value'];
          if (!term) {
            return [];
          }
          return this.api.find(term, {champion: true});
        }),
      )
      .subscribe((list: ID[]) => {
        this.results = list;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
