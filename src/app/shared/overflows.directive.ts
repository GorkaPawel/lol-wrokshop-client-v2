import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[overflows]'
})
export class OverflowsDirective {

  constructor(private rendrer: Renderer2, private elementRef: ElementRef) {
  }

  _overflows: HTMLElement;

  @Input() set overflows(container: HTMLElement) {
    this._overflows = container;
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout(() => this.calcHeight(), 150);
  }

  get overflows() {
    return this._overflows;
  }

  resizeTimeout;

  @HostListener('window:resize', ['$event']) onResize(event?) {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout(() => this.calcHeight(event), 500);
  }

  calcHeight(event?) {
    this.rendrer.removeClass(this.elementRef.nativeElement, 'overflows');

    const windowWidth = window.innerWidth;
    if (windowWidth < 730) {
      this.rendrer.addClass(this.elementRef.nativeElement, 'overflows');
      return;
    }

    const containerHeight = this.overflows.getBoundingClientRect().height;
    const thisHeight = (this.elementRef.nativeElement as HTMLElement).getBoundingClientRect().height;
    if (thisHeight > containerHeight) {
      this.rendrer.addClass(this.elementRef.nativeElement, 'overflows');
    }
  }
}
