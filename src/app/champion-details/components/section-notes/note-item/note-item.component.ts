import {Component, Input} from '@angular/core';
import {Note} from '../../../../API/DB/db.model';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.scss']
})
export class NoteItemComponent {
  constructor() {
  }
  @Input() note: Note;
}
