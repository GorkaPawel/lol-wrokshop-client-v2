import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwipeGalleryComponent } from './swipe-gallery.component';

describe('SwipeGalleryComponent', () => {
  let component: SwipeGalleryComponent;
  let fixture: ComponentFixture<SwipeGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwipeGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwipeGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
