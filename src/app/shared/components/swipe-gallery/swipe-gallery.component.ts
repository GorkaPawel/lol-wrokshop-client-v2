import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {Champ} from '../../models/champions';

@Component({
  selector: 'swipe-gallery',
  templateUrl: './swipe-gallery.component.html',
  styleUrls: ['./swipe-gallery.component.scss']
})
export class SwipeGalleryComponent implements OnChanges {

  constructor(private renderer: Renderer2) {
  }

  @ViewChild('gallery') private galleryRef: ElementRef;
  skinUrl = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/uncentered/';

  @Input()
  set champion(value: Champ) {
    this._champion = value;
    console.log('champion set triggered', this._champion);
  }

  get champion(): Champ {
    return this._champion;
  }

  private _champion: Champ;
  private currentSlide = 0;
  private slidesLength = 0;

  next() {
    if (this.currentSlide + 1 === this.slidesLength) {
      return;
    }
    this.currentSlide++;
    const offset = this.currentSlide * 50;
    this.renderer.setStyle(
      this.galleryRef.nativeElement,
      'transform',
      `translateX(-${offset}vw)`
    );
  }

  prev() {
    if (this.currentSlide === 0) {
      return;
    }
    this.currentSlide--;
    const offset = this.currentSlide * 50;
    this.renderer.setStyle(
      this.galleryRef.nativeElement,
      'transform',
      `translateX(-${offset}vw)`
    );
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes['champion'] && this.champion) {
      this.slidesLength = this.champion.skins.length;
      this.currentSlide = 0;
      console.log('changes to champion and champion defined, curr:', this.currentSlide);
    }
    if (changes['champion'] && this.galleryRef) {
      this.renderer.removeStyle(
        this.galleryRef.nativeElement,
        'transform',
      );
      console.log('champion chages and gallery defined, curr:', this.currentSlide);
    }
  }
}
