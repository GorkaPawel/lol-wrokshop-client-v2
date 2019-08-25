import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunePagePrimaryComponent } from './rune-page-primary.component';

describe('RunePagePrimaryComponent', () => {
  let component: RunePagePrimaryComponent;
  let fixture: ComponentFixture<RunePagePrimaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunePagePrimaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunePagePrimaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
