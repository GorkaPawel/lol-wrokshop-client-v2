import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Spell} from '../../../../API/SERVER/api.model';

@Component({
  selector: 'app-spell-tile',
  template: `
    <div class="spell--tile">
      <img [src]="spellImgUrl" alt="spell">
      <div class="spell--key">{{spellKey}}</div>
    </div>
  `,
  styles: [`
    .spell--tile {
      width: 64px;
      height: 64px;
      position: relative;
    }
    img {
      width: 100%;
      display: block;
    }

    .spell--key {
      position: absolute;
      bottom: 0;
      right: 0;
      text-transform: uppercase;
      font-weight: bold;
      color: inherit;
      width: 1.3rem;
      height: 1.3rem;
      line-height: 1.3rem;
      text-align: center;
      background-color: rgba(1, 1, 1, .6);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpellTileComponent implements OnInit {

  constructor() {
  }

  @Input() set spell(spell: { spell: Spell | 'p', champKey: string }) {
    let spellKey = '';
    if (spell.spell === 'p') {
      spellKey = spell.spell;
    } else {
      spellKey = spell.spell.spellKey;
    }
    this.spellImgUrl = `https://cdn.communitydragon.org/latest/champion/${spell.champKey}/ability-icon/${spellKey}`;
    this.spellKey = spellKey;
  }

  spellKey: string;
  spellImgUrl: string;

  ngOnInit() {
  }

}
