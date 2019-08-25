import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunePageSecondaryComponent } from './rune-page-secondary.component';

describe('RunePageSecondaryComponent', () => {
  let component: RunePageSecondaryComponent;
  let fixture: ComponentFixture<RunePageSecondaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunePageSecondaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunePageSecondaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
