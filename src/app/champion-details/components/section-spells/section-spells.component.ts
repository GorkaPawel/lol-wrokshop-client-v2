import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit} from '@angular/core';
import {ApiChampion} from '../../../API/SERVER/api.model';

@Component({
  selector: 'app-section-spells',
  templateUrl: './section-spells.component.html',
  styleUrls: ['./section-spells.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionSpellsComponent implements OnChanges {

  constructor() {
  }

  @Input() champion: ApiChampion;

  spellUrl;
  currentSpell;

  ngOnChanges() {
    this.spellUrl = `https://cdn.communitydragon.org/latest/champion/${this.champion.key}/ability-icon/`;
    this.currentSpell = 'p';
  }
}
