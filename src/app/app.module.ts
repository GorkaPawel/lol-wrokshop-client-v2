import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AuthModule} from './auth/auth.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './auth/services/auth.interceptor';
import {DashboardModule} from './dashboard/dashboard.module';
import {AuthService} from './auth/services/auth.service';
import {FormsService} from './shared/forms.service';
import {ChampionDetailsModule} from './champion-details/champion-details.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {ApiService} from './API/SERVER/api.service';
import {DbService} from './API/DB/db.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    NgxPaginationModule,
    AuthModule,
    DashboardModule,
    ChampionDetailsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [
    AuthService,
    ApiService,
    DbService,
    FormsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
