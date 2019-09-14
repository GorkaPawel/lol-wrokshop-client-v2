import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() {
  }

  errorMessages$ = new BehaviorSubject<string>(null);
}
