import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClickOutsideDirective} from './click-outside.directive';
import { BurgerNavComponent } from './burger-nav/burger-nav.component';
import {AbilityModalComponent} from '../champion-details/components/ability-modal/ability-modal.component';
import { ErrorModalComponent } from './error-modal/error-modal.component';
import { SplitPipe } from './split.pipe';
import { OverflowsDirective } from './overflows.directive';

@NgModule({
  declarations: [
    ClickOutsideDirective,
    BurgerNavComponent,
    AbilityModalComponent,
    ErrorModalComponent,
    ErrorModalComponent,
    SplitPipe,
    OverflowsDirective
  ],
  exports: [
    OverflowsDirective,
    ClickOutsideDirective,
    BurgerNavComponent,
    AbilityModalComponent,
    ErrorModalComponent,
    SplitPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
