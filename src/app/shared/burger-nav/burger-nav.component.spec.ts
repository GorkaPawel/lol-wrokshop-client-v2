import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BurgerNavComponent } from './burger-nav.component';

describe('BurgerNavComponent', () => {
  let component: BurgerNavComponent;
  let fixture: ComponentFixture<BurgerNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BurgerNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BurgerNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
