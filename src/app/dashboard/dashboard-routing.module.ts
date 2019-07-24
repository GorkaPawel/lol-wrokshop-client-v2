import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {ChampionDetailComponent} from './components/champion-detail/champion-detail.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent, children: [
      {path: 'champion/:id', component: ChampionDetailComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
