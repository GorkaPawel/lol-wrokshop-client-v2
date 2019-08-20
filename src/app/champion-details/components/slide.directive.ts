import {Directive, ElementRef, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appSlide]'
})
export class SlideDirective {

  constructor(private renderer: Renderer2, private elRef: ElementRef) {
  }

  @Input('appSlide') set selected(current: HTMLElement) {
    if (current === this.elRef.nativeElement) {
      this.renderer.addClass(this.elRef.nativeElement, 'current-slide');
    } else {
      this.renderer.removeClass(this.elRef.nativeElement, 'current-slide');
    }
  }
}
