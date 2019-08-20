import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren
} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {SlideDirective} from '../components/slide.directive';
import {pluck} from 'rxjs/operators';
import {ApiChampion} from '../../API/SERVER/api.model';
import {ChampionSources, UserChampion} from '../../API/DB/db.model';

@Component({
  selector: 'app-champion-details',
  templateUrl: './champion-details.component.html',
  styleUrls: ['./champion-details.component.scss']
})

export class ChampionDetailsComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(private renderer: Renderer2, private route: ActivatedRoute, private router: Router) {
  }

  champion: ApiChampion;
  userChampion: UserChampion;
  private champSub: Subscription;
  @ViewChildren(SlideDirective, {read: ElementRef})
  private slides: QueryList<ElementRef>;
  private slidesArray: Array<HTMLElement>;

  lastIndex: number;
  currentElement: HTMLElement;

  onWheel(event: WheelEvent) {
    let index = this.slidesArray.indexOf(this.currentElement);
    if ((event.deltaY > 0) && (index < this.lastIndex)) {
      index++;
    }
    if (event.deltaY < 0 && index) {
      index--;
    }
    this.currentElement = this.slidesArray[index];
  }

  scrollToElement(element: HTMLElement): void {
    this.currentElement = element;
  }

  ngOnInit() {
    this.champSub = this.route.data
      .pipe(pluck('champion'))
      .subscribe((champion: ChampionSources) => {
        this.champion = champion.ApiChamp;
        this.userChampion = champion.DbChamp;
      });
  }

  ngOnDestroy() {
    this.champSub.unsubscribe();
  }

  ngAfterViewInit() {
    this.slidesArray = this.slides.toArray().map((element: ElementRef) => {
      return element.nativeElement;
    });
    this.lastIndex = this.slidesArray.length - 1;
    setTimeout(() => {
      this.currentElement = this.slidesArray[0];
    });
  }
}
