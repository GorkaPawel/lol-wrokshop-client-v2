import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChampionDetailsComponent} from './champion-details.component';
import {SharedModule} from '../shared/shared.module';
import { SkinsGalleryComponent } from './components/skins-gallery/skins-gallery.component';
import {ChampionDetailResolver} from './services/champion-detail.resolver';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    ChampionDetailsComponent,
    SkinsGalleryComponent
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
