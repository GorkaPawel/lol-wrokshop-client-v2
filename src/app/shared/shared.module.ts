import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClickOutsideDirective} from './directives/click-outside.directive';
import { SwipeGalleryComponent } from './components/swipe-gallery/swipe-gallery.component';

@NgModule({
  declarations: [
    ClickOutsideDirective,
    SwipeGalleryComponent,
  ],
  exports: [
    SwipeGalleryComponent,
    ClickOutsideDirective,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
