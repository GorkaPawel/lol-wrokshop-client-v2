import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-burger-nav',
  templateUrl: './burger-nav.component.html',
  styleUrls: ['./burger-nav.component.scss']
})
export class BurgerNavComponent {
  constructor() {
  }

  navOpened = false;
  @Input() main = false;

  toggleNav() {
    this.navOpened = !this.navOpened;
  }
}
