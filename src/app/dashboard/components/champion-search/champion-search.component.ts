import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {ChampionsDataService} from '../../../shared/services/champions-data.service';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {Champion} from '../../../shared/models/champions';
import {Router} from '@angular/router';
import {switchMap} from 'rxjs/internal/operators/switchMap';
import {tap} from 'rxjs/internal/operators/tap';

@Component({
  selector: 'app-champion-search',
  templateUrl: './champion-search.component.html',
  styleUrls: ['./champion-search.component.scss']
})
export class ChampionSearchComponent implements AfterViewInit {

  @ViewChild('search') searchRef: ElementRef;
  results$: Observable<Array<Champion>>;
  searchTerm$: Observable<string>;

  isOpened = false;


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
          const term = event.target['value'];
          return term;
        })
      );
    this.results$ = this.searchTerm$.pipe(
      debounceTime(400),
      switchMap((term: string) => {
        return this.champService.getChampionList(term);
      }),
      tap(() => {
        this.open();
      })
    );
  }
}
