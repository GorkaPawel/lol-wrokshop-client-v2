import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Passive} from '../../../API/SERVER/api.model';

@Component({
  selector: 'champion-passive',
  templateUrl: './champion-passive.component.html',
  styleUrls: ['./champion-passive.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChampionPassiveComponent {

  constructor() {
  }

  @Input()
  passive: Passive;

  @Input()
  name: string;

  spellVideoUrl = 'https://d28xe8vt774jo5.cloudfront.net/';
}
