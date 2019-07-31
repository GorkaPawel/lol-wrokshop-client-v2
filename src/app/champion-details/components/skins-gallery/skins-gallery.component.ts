import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Champ} from '../../../shared/models/champions';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'skins-gallery',
  templateUrl: './skins-gallery.component.html',
  styleUrls: ['./skins-gallery.component.scss']
})
export class SkinsGalleryComponent implements OnInit, OnDestroy {


  constructor(private renderer: Renderer2, private route: ActivatedRoute) {
  }

  @ViewChild('gallery') private galleryRef: ElementRef;
  skinUrl = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/uncentered/';


  private champion: Champ;
  private champSub: Subscription;
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

  ngOnInit() {
    this.champSub = this.route.parent.data
      .subscribe((data: { champion: Champ }) => {
        this.currentSlide = 0;
        if (this.galleryRef) {
          this.renderer.removeStyle(this.galleryRef.nativeElement, 'transform');
        }
        this.champion = data.champion;
        this.slidesLength = this.champion.skins.length;
      });
  }

  ngOnDestroy() {
    this.champSub.unsubscribe();
  }
}
