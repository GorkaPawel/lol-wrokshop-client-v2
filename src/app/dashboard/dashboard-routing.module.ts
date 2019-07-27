import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {ChampionDetailsComponent} from '../champion-details/champion-details.component';
import {SkinsGalleryComponent} from '../champion-details/components/skins-gallery/skins-gallery.component';
import {ChampionDetailResolver} from '../champion-details/services/champion-detail.resolver';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'champion/:id',
        component: ChampionDetailsComponent,
        resolve: { champion: ChampionDetailResolver },
        children: [
          { path: 'skins', component: SkinsGalleryComponent }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
