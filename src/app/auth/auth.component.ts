import {Component} from '@angular/core';

@Component({
  selector: 'app-auth',
  template: `
    <section class="auth">
      <router-outlet></router-outlet>
    </section>
  `,
  styles: [`
    :host {
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 5;
    }

    .auth {
      z-index: 6;
      font-size: calc(14px + .4vw);
      min-width: 300px;
      width: 30vw;
    }
  `]
})
export class AuthComponent {
}
