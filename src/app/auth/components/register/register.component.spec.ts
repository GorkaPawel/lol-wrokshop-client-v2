import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegisterComponent} from './register.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {DebugElement} from '@angular/core';
import {AppRoutingModule} from '../../../app-routing.module';


const authServiceStub: Partial<AuthService> = {
  register() {
  },
};
describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let de: DebugElement;
  let authService;


  beforeEach(async(() => {


    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        ReactiveFormsModule,
        AppRoutingModule,
      ],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceStub
        },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    authService = TestBed.get(AuthService);
    fixture.detectChanges();
  });

  it('Should have email, password, and passwordConfirm controls', () => {
    expect(component.registerForm.contains('email')).toBeTruthy();
    expect(component.registerForm.contains('passwords')).toBeTruthy();
  });
});
