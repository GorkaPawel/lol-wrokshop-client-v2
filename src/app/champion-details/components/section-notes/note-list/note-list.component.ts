import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Note, UserChampion} from '../../../../API/DB/db.model';
import {NoteService} from '../note.service';
import {DbService} from '../../../../API/DB/db.service';
import {ActivatedRoute} from '@angular/router';
import {SubSink} from 'subsink';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent implements OnInit, OnDestroy {

  constructor(private noteService: NoteService, private db: DbService, private route: ActivatedRoute) {
  }

  subs = new SubSink();
  @Input()
  userChampion: UserChampion;
  formOpened = false;

  openForm() {
    this.formOpened = true;
  }

  closeForm() {
    this.formOpened = false;
  }

  editNote(note: Note) {
    this.noteService.noteToUpdate$.next(note);
  }

  ngOnInit() {
    this.subs.add(this.noteService.noteToUpdate$.subscribe((note: Note) => {
      this.openForm();
    }));
    this.subs.add(this.noteService.noteUpdated$.subscribe((note: Note) => {
      if (note) {
        this.db.updateNote(note).subscribe((response) => {
          this.route.snapshot.data.champion.DbChamp.notes = response;
        });
      }
      this.closeForm();
    }));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
