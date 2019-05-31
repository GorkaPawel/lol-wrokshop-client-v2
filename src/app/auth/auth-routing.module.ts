import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {AuthComponent} from './auth.component';

const routes: Routes = [
  {
    path: 'home', component: AuthComponent,
    children: [
      {path: '', component: LoginComponent, pathMatch: 'full'},
      {path: 'register', component: RegisterComponent},
      {path: 'logout', redirectTo: 'login'},
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
