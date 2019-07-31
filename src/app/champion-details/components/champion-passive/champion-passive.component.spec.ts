import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionPassiveComponent } from './champion-passive.component';

describe('ChampionPassiveComponent', () => {
  let component: ChampionPassiveComponent;
  let fixture: ComponentFixture<ChampionPassiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChampionPassiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChampionPassiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
