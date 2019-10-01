import {Component} from '@angular/core';


@Component({
  selector: 'app-spinner',
  template: `
    <div class="spinner"></div>
  `,
  styles: [`
    .spinner {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(1, 1, 1, .8);
      z-index: 1000;
    }

    .spinner::before {
      content: '';
      width: 80px;
      height: 80px;
      left: calc(50% - 40px);
      top: calc(50% - 40px);
      border-radius: 50%;
      border-top: 6px solid deepskyblue;
      border-right: 6px solid transparent;
      animation: spin 1s linear infinite;
      position: absolute;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `]
})
export class SpinnerComponent {}
