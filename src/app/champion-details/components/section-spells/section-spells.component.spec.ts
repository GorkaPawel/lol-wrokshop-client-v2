import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionSpellsComponent } from './section-spells.component';

describe('SectionSpellsComponent', () => {
  let component: SectionSpellsComponent;
  let fixture: ComponentFixture<SectionSpellsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionSpellsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionSpellsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
