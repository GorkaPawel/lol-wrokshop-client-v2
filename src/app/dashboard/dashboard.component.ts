import {Component} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <app-champion-search></app-champion-search>
    <router-outlet></router-outlet>
  `,
  styles: [``]
})
export class DashboardComponent {
}
