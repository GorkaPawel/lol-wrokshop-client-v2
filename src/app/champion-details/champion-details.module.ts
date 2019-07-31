import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChampionDetailsComponent} from './champion-details.component';
import {SharedModule} from '../shared/shared.module';
import { SkinsGalleryComponent } from './components/skins-gallery/skins-gallery.component';
import {ChampionDetailResolver} from './services/champion-detail.resolver';
import {RouterModule} from '@angular/router';
import {ChampionStatsComponent} from './components/champion-stats/champion-stats.component';
import {ChampionSpellComponent} from './components/champion-spell/champion-spell.component';
import { ChampionPassiveComponent } from './components/champion-passive/champion-passive.component';


@NgModule({
  declarations: [
    ChampionDetailsComponent,
    SkinsGalleryComponent,
    ChampionStatsComponent,
    ChampionSpellComponent,
    ChampionPassiveComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ],
  providers: [
    ChampionDetailResolver
  ]
})
export class ChampionDetailsModule { }
