import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import { ChampionSearchComponent } from './components/champion-search/champion-search.component';
import {ChampionsDataService} from './services/champions-data.service';
import { ChampionDetailComponent } from './components/champion-detail/champion-detail.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [DashboardComponent, ChampionSearchComponent, ChampionDetailComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ],
  providers: [
    ChampionsDataService,
  ]
})
export class DashboardModule {
}
