import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthComponent} from './auth.component';
import {AuthRoutingModule} from './auth-routing.module';

@NgModule({
  declarations: [RegisterComponent, LoginComponent, AuthComponent],
  imports: [
    AuthRoutingModule,
    ReactiveFormsModule,
    CommonModule,
  ]
})
export class AuthModule {
}
