import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-section-builds',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SectionBuildsComponent {
  constructor() {
  }
}

