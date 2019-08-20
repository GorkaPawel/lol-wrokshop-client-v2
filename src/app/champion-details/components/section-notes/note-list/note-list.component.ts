import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Note, UserChampion} from '../../../../API/DB/db.model';
import {NoteService} from '../note.service';
import {DbService} from '../../../../API/DB/db.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent implements OnInit, OnDestroy {

  constructor(private noteService: NoteService, private db: DbService) {
  }

  sub1: Subscription;
  sub2: Subscription;
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
    this.sub1 = this.noteService.noteToUpdate$.subscribe((note: Note) => {
      console.log('value got from to update subject', note);
      this.openForm();
    });
    this.sub2 = this.noteService.noteUpdated$.subscribe((note: Note) => {
      if (note) {
        this.db.updateNote(note);
      }
      console.log('value got from updated subject', note);
      this.closeForm();
    });
  }

  ngOnDestroy() {
    console.log('ng destroy called on list');
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
}
