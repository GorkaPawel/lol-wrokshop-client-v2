import {Component} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <app-champion-search></app-champion-search>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
}
