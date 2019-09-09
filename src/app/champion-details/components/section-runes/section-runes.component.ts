import {ChangeDetectionStrategy, Component} from '@angular/core';
@Component({
  selector: 'app-section-runes',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionRunesComponent {

  constructor() {
  }
}
