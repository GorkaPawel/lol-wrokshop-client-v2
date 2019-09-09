import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {ApiService} from '../../../../API/SERVER/api.service';
import {ApiItem, ID} from '../../../../API/SERVER/api.model';
import {SubSink} from 'subsink';

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.scss']
})
export class ItemSearchComponent implements AfterViewInit, OnDestroy {
  constructor(private api: ApiService, private detector: ChangeDetectorRef ) {
  }

  @ViewChild('search')
  searchRef: ElementRef;
  @Output()
  selectedItem = new EventEmitter();
  results: ID[];
  subs = new SubSink();

  chooseItem(id: string) {
    this.subs.add(this.api.getItem(id).subscribe((item: ApiItem) => {
      this.selectedItem.emit(item);
    }));
  }

  ngAfterViewInit() {
    this.subs.add(fromEvent((this.searchRef.nativeElement as HTMLInputElement), 'input')
      .pipe(
        debounceTime(400),
        map((event) => {
          return this.api.find(event.target['value'], {champion: false});
        })
      )
      .subscribe((list: ID[]) => {
        this.results = list;
        this.detector.detectChanges();
      }));
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
