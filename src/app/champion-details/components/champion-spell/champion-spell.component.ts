import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Spell} from '../../../shared/models/champions';
import {ChampionsDataService} from '../../../shared/services/champions-data.service';

@Component({
  selector: 'champion-spell',
  templateUrl: './champion-spell.component.html',
  styleUrls: ['./champion-spell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChampionSpellComponent implements OnChanges {

  constructor(private championData: ChampionsDataService) {
  }

  @Input()
  spell: Spell;
  @Input()
  name: string;

  parsed;
  apiError = false;
  spellIconUrl: string;

  parseTags(text: string): string {
    const reg1 = /<\/(scale\w+|rules)>/gm;
    const reg2 = /<(scale\w+|rules)>/gm;

    let parsed = text.replace(reg1, '</span>');
    parsed = parsed.replace(reg2, (...matches) => {
      return `<span class="${matches[1]}">`;
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
    const regex = /[afe][1-9]0?[\S]*/g;
    // replace params with values or ? if param doesnt exist
    let parsed = this.spell.tooltip.replace(regex, (match) => {
      if (map[match]) {
        return map[match];
      }
      this.apiError = true;
      return '?';
    });
    // regex to clean up curly braces
    const regex2 = /({{|}})/g;
    parsed = parsed.replace(regex2, '');
    parsed = this.parseTags(parsed);
    return parsed;
  }

  ngOnChanges() {
    if (this.spell) {
      this.parsed = this.parseTooltip();
      this.spellIconUrl = this.championData.generateSpellImgUrl(this.spell.abilityIconPath, this.name);
    }
  }
}
