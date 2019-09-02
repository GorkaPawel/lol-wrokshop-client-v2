import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {ApiService} from '../../../../API/SERVER/api.service';
import {ApiItem, ID} from '../../../../API/SERVER/api.model';

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.scss']
})
export class ItemSearchComponent implements AfterViewInit, OnDestroy {
  constructor(private api: ApiService) {
  }

  @ViewChild('search')
  searchRef: ElementRef;
  @Output()
  selectedItem = new EventEmitter();
  subscription: Subscription;
  sub2: Subscription;
  results: ID[] = [];

  chooseItem(id: string) {
    this.sub2 = this.api.getItem(id).subscribe((item: ApiItem) => {
      this.selectedItem.emit(item);
    });
  }

  ngAfterViewInit() {
    this.subscription = fromEvent((this.searchRef.nativeElement as HTMLInputElement), 'input')
      .pipe(
        debounceTime(400),
        map((event) => {
          return this.api.find(event.target['value'], {champion: false});
        })
      )
      .subscribe((list: ID[]) => {
        this.results = list;
      });
  }
  // TODO co sie spuralo b=przy szukaniu itemow
  ngOnDestroy() {
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
    this.subscription.unsubscribe();
  }
}