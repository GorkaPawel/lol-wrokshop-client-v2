import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild
} from '@angular/core';
import {ApiService} from '../../../API/SERVER/api.service';
import {Spell} from '../../../API/SERVER/api.model';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';


@Component({
  selector: 'champion-spell',
  templateUrl: './champion-spell.component.html',
  styleUrls: ['./champion-spell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChampionSpellComponent implements AfterViewInit {

  constructor(private sanitizer: DomSanitizer, private api: ApiService, private renderer: Renderer2, private cdr: ChangeDetectorRef) {
  }

  @ViewChild('video') video: ElementRef;

  _spell: Spell;
  @Input()
  set spell(spell: Spell) {
    this._spell = spell;
    this.parsed = this.sanitizer.bypassSecurityTrustHtml(this.parseTooltip());
  }

  get spell() {
    return this._spell;
  }

  @Input()
  name: string;

  isPlaying = false;
  parsed;
  apiError = false;
  spellVideoUrl = 'https://d28xe8vt774jo5.cloudfront.net/';

  parseTags(text: string): string {
    const reg1 = /<\/(scale\w+|rules|spellPassive|spellActive|magicDamage|physicalDamage|keywordStealth|trueDamage)>/gm;
    const reg2 = /<(scale\w+|rules|spellPassive|spellActive|magicDamage|physicalDamage|keywordStealth|trueDamage)>/gm;
    const styleRegex = /class="color([\S]*)"/gm;
    let parsed = text.replace(reg1, '</span>');
    parsed = parsed.replace(reg2, (...matches) => {
      return '<span class="' + matches[1] + '">';
    });
    parsed = parsed.replace(styleRegex, (...matches) => {
      return `style="color:#${matches[1]}"`;
    });
    return parsed;
  }

  parseTooltip(): string {
    // object that maps string params to their values
    const map = {};
    // assign e type params to map
    for (const index in this.spell.effectBurn) {
      const property = `e${index}`;
      map[property] = this.spell.effectBurn[index];
    }
    // assign remaining param types {a,f}
    for (const spellVar of this.spell.vars) {
      map[spellVar.key] = `${(spellVar.coeff * 100)}%`;
    }
    // regex to match params in string
    /*    const regex = /\s[afe][1-9]0?[\S]*\s/g;*/
    const regex = /{{\s([\S]*)\s}}/g;
    // replace params with values or ? if param doesnt exist
    let parsed = this.spell.tooltip.replace(regex, (...matches) => {
      const match = matches[1];
      if (map[match]) {
        return map[match];
      }
      this.apiError = true;
      return '<span class="unknown">*</span>';
    });
    // regex to clean up curly braces
    const regex2 = /({{|}})/g;
    parsed = parsed.replace(regex2, '');
    parsed = this.parseTags(parsed);
    return parsed;
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
