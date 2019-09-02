import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChampionDetailsComponent} from './view/champion-details.component';
import {SharedModule} from '../shared/shared.module';
import { SkinsGalleryComponent } from './components/skins-gallery/skins-gallery.component';
import {ChampionDetailResolver} from './champion-detail.resolver';
import {RouterModule} from '@angular/router';
import {ChampionStatsComponent} from './components/champion-stats/champion-stats.component';
import {ChampionSpellComponent} from './components/champion-spell/champion-spell.component';
import { ChampionPassiveComponent } from './components/champion-passive/champion-passive.component';
import { ItemSearchComponent } from './components/section-builds/item-search/item-search.component';
import { HistoryComponent } from './components/history/history.component';
import {SlideDirective} from './components/slide.directive';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { BuildListItemComponent } from './components/section-builds/build-list-item/build-list-item.component';
import { SectionBuildsComponent } from './components/section-builds/section-builds.component';
import { BuildListComponent } from './components/section-builds/build-list/build-list.component';
import { EditBuildComponent } from './components/section-builds/edit-build/edit-build.component';
import { ItemComponent } from './components/section-builds/item/item.component';
import { NoteListComponent } from './components/section-notes/note-list/note-list.component';
import {NoteItemComponent} from './components/section-notes/note-item/note-item.component';
import { NoteFormComponent } from './components/section-notes/note-form/note-form.component';
import {NoteService} from './components/section-notes/note.service';
import { SectionRunesComponent } from './components/section-runes/section-runes.component';
import { RunesListComponent } from './components/section-runes/runes-list/runes-list.component';
import { RunesEditComponent } from './components/section-runes/runes-edit/runes-edit.component';
import { KeystoneComponent } from './components/section-runes/keystone/keystone.component';
import { RunePagePrimaryComponent } from './components/section-runes/rune-page-primary/rune-page-primary.component';
import { RunePageSecondaryComponent } from './components/section-runes/rune-page-secondary/rune-page-secondary.component';
import { RuneListItemComponent } from './components/section-runes/rune-list-item/rune-list-item.component';
import { SectionSpellsComponent } from './components/section-spells/section-spells.component';
import { AbilityModalComponent } from './components/ability-modal/ability-modal.component';

@NgModule({
  declarations: [
    ChampionDetailsComponent,
    SkinsGalleryComponent,
    ChampionStatsComponent,
    ChampionSpellComponent,
    ChampionPassiveComponent,
    ItemSearchComponent,
    HistoryComponent,
    SlideDirective,
    NoteItemComponent,
    BuildListItemComponent,
    SectionBuildsComponent,
    BuildListComponent,
    EditBuildComponent,
    ItemComponent,
    NoteListComponent,
    NoteFormComponent,
    SectionRunesComponent,
    RunesListComponent,
    RunesEditComponent,
    KeystoneComponent,
    RunePagePrimaryComponent,
    RunePageSecondaryComponent,
    RuneListItemComponent,
    SectionSpellsComponent,
    AbilityModalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  providers: [
    ChampionDetailResolver,
    NoteService,
  ]
})
export class ChampionDetailsModule { }
