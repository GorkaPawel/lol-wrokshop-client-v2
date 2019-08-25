import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {LoginComponent} from './auth/components/login/login.component';
import {RegisterComponent} from './auth/components/register/register.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ChampionDetailsComponent} from './champion-details/view/champion-details.component';
import {ChampionDetailResolver} from './champion-details/champion-detail.resolver';
import {SkinsGalleryComponent} from './champion-details/components/skins-gallery/skins-gallery.component';
import {ChampionStatsComponent} from './champion-details/components/champion-stats/champion-stats.component';
import {HistoryComponent} from './champion-details/components/history/history.component';
import {SectionBuildsComponent} from './champion-details/components/section-builds/section-builds.component';
import {EditBuildComponent} from './champion-details/components/section-builds/edit-build/edit-build.component';
import {BuildListComponent} from './champion-details/components/section-builds/build-list/build-list.component';
import {SectionRunesComponent} from './champion-details/components/section-runes/section-runes.component';
import {RunesListComponent} from './champion-details/components/section-runes/runes-list/runes-list.component';
import {RunesEditComponent} from './champion-details/components/section-runes/runes-edit/runes-edit.component';
import {RunesResolver} from './champion-details/components/section-runes/runes.resolver';


const routes: Routes = [
  {
    path: '', component: AuthComponent, children: [
      {path: '', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'logout', redirectTo: ''},
    ]
  },
  {
    path: 'dashboard', component: DashboardComponent, children: [
      {
        path: 'champion/:id',
        component: ChampionDetailsComponent,
        resolve: {champion: ChampionDetailResolver},
        children: [
          // {path: '', component: BlankComponent},
          {
            path: '', outlet: 'overview', children:
              [
                {path: '', component: ChampionStatsComponent},
                {path: 'stats', component: ChampionStatsComponent},
                {path: 'skins', component: SkinsGalleryComponent},
                {path: 'history', component: HistoryComponent},
              ]
          },
          {
            path: '', outlet: 'builds', component: SectionBuildsComponent,
            children:
              [
                {path: '', component: BuildListComponent},
                {path: 'edit', component: EditBuildComponent},
              ]
          },
          {
            path: 'runes', outlet: 'builds', component: SectionRunesComponent,
            resolve: {runes: RunesResolver},
            children:
              [
                {path: '', component: RunesListComponent},
                {path: 'edit', component: RunesEditComponent},
              ],
          }
        ]
      },
    ]
  },
  {path: '**', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
  )],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
