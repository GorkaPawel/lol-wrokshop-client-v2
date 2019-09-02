import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuneListItemComponent } from './rune-list-item.component';

describe('RuneListItemComponent', () => {
  let component: RuneListItemComponent;
  let fixture: ComponentFixture<RuneListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuneListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuneListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
