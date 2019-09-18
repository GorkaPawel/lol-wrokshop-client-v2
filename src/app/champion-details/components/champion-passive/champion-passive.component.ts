import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import {Passive} from '../../../API/SERVER/api.model';

@Component({
  selector: 'champion-passive',
  templateUrl: './champion-passive.component.html',
  styleUrls: ['./champion-passive.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChampionPassiveComponent implements AfterViewInit {
  constructor(private renderer: Renderer2, private cdr: ChangeDetectorRef) {
  }
  @ViewChild('video') video: ElementRef;

  private _passive: Passive;
  @Input()
  name: string;
  spellVideoUrl: string;
  isPlaying = false;

  @Input()
  set passive(passive: Passive) {
    this._passive = passive;
    this.spellVideoUrl = 'https://d28xe8vt774jo5.cloudfront.net/' + passive.abilityVideoPath;
  }

  get passive() {
    return this._passive;
  }
  play() {
    this.video.nativeElement.play();
    this.isPlaying = true;
  }
  pause() {
    this.video.nativeElement.pause();
    this.isPlaying = false;
  }
  ngAfterViewInit() {
    this.renderer.listen(this.video.nativeElement, 'ended', () => {
      this.isPlaying = false;
      this.cdr.detectChanges();
    });
  }
}
