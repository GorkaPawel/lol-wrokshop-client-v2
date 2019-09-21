import {Component} from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <img src="/assets/error.svg" alt="error">
    <span data-text="Page not found!">Page not found!</span>
  `,
  styles: [`
    :host {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    img {
      max-width: 120px;
      filter: contrast(0) brightness(.2) sepia(1) hue-rotate(-40deg) saturate(15);
    }

    span {
      margin: 1rem 0;
      font-size: 1.5rem;
    }
  `]
})
export class NotFoundComponent {

  constructor() {
  }
}
