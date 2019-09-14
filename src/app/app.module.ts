import {ErrorHandler, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AuthModule} from './auth/auth.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './auth/services/auth.interceptor';
import {DashboardModule} from './dashboard/dashboard.module';
import {ChampionDetailsModule} from './champion-details/champion-details.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {AuthGuard} from './auth/services/auth.guard';
import {NegateAuthGuard} from './auth/services/negate-auth.guard';
import {ErrorsHandler} from './errors-handler';
import {SharedModule} from './shared/shared.module';

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
    SharedModule,
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler,
    },
    AuthGuard,
    NegateAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
