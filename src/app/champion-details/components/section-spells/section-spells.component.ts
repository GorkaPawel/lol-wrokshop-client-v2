import {Component, Input, OnInit} from '@angular/core';
import {ApiChampion} from '../../../API/SERVER/api.model';

@Component({
  selector: 'app-section-spells',
  templateUrl: './section-spells.component.html',
  styleUrls: ['./section-spells.component.scss'],
})
export class SectionSpellsComponent implements OnInit {

  constructor() {
  }

  @Input() set champion(champ: ApiChampion) {
    this._champion = champ;
    this.spellUrl = `https://cdn.communitydragon.org/latest/champion/${champ.key}/ability-icon/`;
  }

  get champion() {
    return this._champion;
  }

  private _champion: ApiChampion;
  currentSpell: string;
  spellUrl: string;

  ngOnInit() {
    this.currentSpell = 'p';
  }
}
