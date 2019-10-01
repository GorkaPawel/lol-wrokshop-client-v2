import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthComponent} from './auth.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [RegisterComponent, LoginComponent, AuthComponent],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    SharedModule
  ]
})
export class AuthModule {
}
