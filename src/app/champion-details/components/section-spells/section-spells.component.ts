import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ApiChampion} from '../../../API/SERVER/api.model';

@Component({
  selector: 'app-section-spells',
  templateUrl: './section-spells.component.html',
  styleUrls: ['./section-spells.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionSpellsComponent {

  constructor() { }
  @Input() champion: ApiChampion;
}
