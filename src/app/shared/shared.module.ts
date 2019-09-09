import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClickOutsideDirective} from './click-outside.directive';
import { BurgerNavComponent } from './burger-nav/burger-nav.component';

@NgModule({
  declarations: [
    ClickOutsideDirective,
    BurgerNavComponent,
  ],
  exports: [
    ClickOutsideDirective,
    BurgerNavComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
