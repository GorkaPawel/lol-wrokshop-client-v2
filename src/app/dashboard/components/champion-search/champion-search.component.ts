import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {fromEvent, Observable, Subscription} from 'rxjs';
import {ChampionsDataService} from '../../../shared/services/champions-data.service';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {Champion} from '../../../shared/models/champions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-champion-search',
  templateUrl: './champion-search.component.html',
  styleUrls: ['./champion-search.component.scss']
})
export class ChampionSearchComponent implements AfterViewInit, OnDestroy {

  @ViewChild('search') searchRef: ElementRef;
  results: Array<Champion> = [];
  searchTerm$: Observable<Array<Champion> | []>;

  isOpened = false;
  private searchSub: Subscription;


  constructor(private champService: ChampionsDataService, private router: Router) {
  }

  close() {
    this.isOpened = false;
  }

  open() {
    this.isOpened = true;
  }

  goToDetails(championName: string) {
    this.close();
    this.router.navigate(['dashboard/champion/' + championName + '/skins']);
  }

  ngAfterViewInit() {
    this.searchTerm$ = fromEvent((this.searchRef.nativeElement as HTMLInputElement), 'input')
      .pipe(
        map((event) => {
          let term = event.target['value'];
          term = term.charAt(0).toUpperCase() + term.slice(1);
          return term;
        }),
        debounceTime(400),
        distinctUntilChanged(),
        map((term: string) => {
          return this.champService.findChampion(term);
        })
      );


    this.searchSub = this.searchTerm$.subscribe((results: Array<Champion>) => {
        this.results = results;
        this.open();
        console.log('Champion subscribtion: ', results);
      }
    );
  }

  ngOnDestroy(): void {
    this.searchSub.unsubscribe();
  }
}
