import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionRunesComponent } from './champion-runes.component';

describe('ChampionRunesComponent', () => {
  let component: ChampionRunesComponent;
  let fixture: ComponentFixture<ChampionRunesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChampionRunesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChampionRunesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
