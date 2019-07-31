import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionSpellComponent } from './champion-spells.component';

describe('ChampionSpellComponent', () => {
  let component: ChampionSpellComponent;
  let fixture: ComponentFixture<ChampionSpellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChampionSpellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChampionSpellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
