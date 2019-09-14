import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClickOutsideDirective} from './click-outside.directive';
import { BurgerNavComponent } from './burger-nav/burger-nav.component';
import {AbilityModalComponent} from '../champion-details/components/ability-modal/ability-modal.component';
import { ErrorModalComponent } from './error-modal/error-modal.component';

@NgModule({
  declarations: [
    ClickOutsideDirective,
    BurgerNavComponent,
    AbilityModalComponent,
    ErrorModalComponent,
    ErrorModalComponent
  ],
  exports: [
    ClickOutsideDirective,
    BurgerNavComponent,
    AbilityModalComponent,
    ErrorModalComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
