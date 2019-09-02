import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiChampion} from '../../../API/SERVER/api.model';

@Component({
  selector: 'skins-gallery',
  templateUrl: './skins-gallery.component.html',
  styleUrls: ['./skins-gallery.component.scss']
})
export class SkinsGalleryComponent implements OnInit {


  constructor(private route: ActivatedRoute) {
  }

  skinUrl = 'http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/uncentered/';


  private champion: ApiChampion;
  private currentSlide = 0;
  private slidesLength = 0;

  next() {
    if (this.currentSlide + 1 === this.slidesLength) {
      return;
    }
    this.currentSlide++;
  }

  prev() {
    if (this.currentSlide === 0) {
      return;
    }
    this.currentSlide--;
  }

  ngOnInit() {
    this.champion = this.route.parent.snapshot.data.champion.ApiChamp;
    console.log('lele', this.champion);
    this.currentSlide = 0;
    this.slidesLength = this.champion.skins.length;
  }
}
