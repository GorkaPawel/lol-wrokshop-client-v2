import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Note} from '../../../API/DB/db.model';

@Injectable()
export class NoteService {

  noteToUpdate$ = new BehaviorSubject<Note>(null);
  noteUpdated$ = new BehaviorSubject<Note>(null);

  constructor() {
  }
}
