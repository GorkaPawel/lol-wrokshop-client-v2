import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {NoteService} from '../note.service';
import {Note} from '../../../../API/DB/db.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent implements OnInit, OnDestroy {

  constructor(private noteService: NoteService) {
  }

  sub: Subscription;
  note: Note;
  titleText = '';
  noteText = '';

  updateNotes(form: NgForm) {
    const updatedNote = {
      ...this.note,
      note: form.value.note,
      title: form.value.title
    };
    this.noteService.noteUpdated$.next(updatedNote);
  }

  ngOnInit() {
    this.sub = this.noteService.noteToUpdate$.subscribe(
      (note: Note) => {
        if (note) {
          this.note = note;
          this.titleText = note.title;
          this.noteText = note.note;
        } else {
          this.titleText = '';
          this.noteText = '';
        }
      }
    );
  }

  ngOnDestroy() {
    console.log('on destroy called on form');
    this.sub.unsubscribe();
  }
}
