import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import { ChampionSearchComponent } from './components/champion-search/champion-search.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import { BlankComponent } from './components/blank/blank.component';

@NgModule({
  declarations: [DashboardComponent, ChampionSearchComponent, BlankComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ],
})
export class DashboardModule {
}
