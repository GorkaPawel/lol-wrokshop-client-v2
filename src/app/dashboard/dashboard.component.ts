import {Component} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <app-champion-search></app-champion-search>
    <section class="content">
      <router-outlet></router-outlet>
    </section>
  `,
  styles: [`
  .content {
    margin-top: 70px;
  }`]
})
export class DashboardComponent {
}
