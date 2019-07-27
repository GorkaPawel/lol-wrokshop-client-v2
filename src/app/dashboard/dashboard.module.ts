import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import { ChampionSearchComponent } from './components/champion-search/champion-search.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [DashboardComponent, ChampionSearchComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ],
})
export class DashboardModule {
}
