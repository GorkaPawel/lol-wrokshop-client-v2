import {
  AfterViewInit,
  Component,
  ElementRef, OnDestroy,
  OnInit,
  QueryList,
  Renderer2, ViewChild,
  ViewChildren
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SlideDirective} from '../components/slide.directive';
import {ApiChampion} from '../../API/SERVER/api.model';
import {UserChampion} from '../../API/DB/db.model';
import {RunesAdapterService} from '../components/section-runes/runes-adapter.service';
import {SubSink} from 'subsink';
import {AuthService} from '../../auth/services/auth.service';
import {NoteService} from '../components/section-notes/note.service';

@Component({
  selector: 'app-champion-details',
  templateUrl: './champion-details.component.html',
  styleUrls: ['./champion-details.component.scss'],
  providers: [RunesAdapterService, NoteService],
})

export class ChampionDetailsComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private renderer: Renderer2, private route: ActivatedRoute, private router: Router, private runesService: RunesAdapterService, private authService: AuthService) {
  }

  champion: ApiChampion;
  userChampion: UserChampion;
  @ViewChild('main') main: ElementRef;
  @ViewChildren(SlideDirective, {read: ElementRef})
  private slides: QueryList<ElementRef>;
  private slidesArray: Array<HTMLElement>;
  subs = new SubSink();

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
    this.subs.add(this.route.data.subscribe((data) => {
      this.champion = data.champion.ApiChamp;
      this.userChampion = data.champion.DbChamp;
      this.runesService.storeRunes(data.champion.apiRunes);
    }));
  }

  ngAfterViewInit() {
    this.slidesArray = this.slides.toArray().map((element: ElementRef) => {
      return element.nativeElement;
    });
    this.lastIndex = this.slidesArray.length - 1;
    setTimeout(() => {
      this.currentElement = this.slidesArray[0];
      this.renderer.listen(this.main.nativeElement, 'keydown', (event) => {
        let index = this.slidesArray.indexOf(this.currentElement);
        if (event.key === 'ArrowDown' && (index < this.lastIndex)) {
          index++;
        }
        if (event.key === 'ArrowUp' && index) {
          index--;
        }
        this.currentElement = this.slidesArray[index];
      });
      this.subs.add(this.route.params.subscribe(() => {
        this.currentElement = this.slidesArray[0];
      }));
    });
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
