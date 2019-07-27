import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkinsGalleryComponent } from './skins-gallery.component';

describe('SkinsGalleryComponent', () => {
  let component: SkinsGalleryComponent;
  let fixture: ComponentFixture<SkinsGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkinsGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkinsGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
