import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunesEditComponent } from './runes-edit.component';

describe('RunesEditComponent', () => {
  let component: RunesEditComponent;
  let fixture: ComponentFixture<RunesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
