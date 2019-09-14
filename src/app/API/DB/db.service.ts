import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Build, Note} from './db.model';
import {RunePage} from '../../champion-details/components/section-runes/runes.model';
import {map} from 'rxjs/operators';
import {ApiService} from '../SERVER/api.service';
import {ID} from '../SERVER/api.model';
import {switchMap} from 'rxjs/internal/operators/switchMap';
import {of} from 'rxjs/internal/observable/of';
import {Observable} from 'rxjs';

const USER_CHAMPION_LIST_URL = 'http://localhost:8080/account/champions';
const USER_CHAMPION_URL = 'http://localhost:8080/account/champion/';
const USER_BUILD_URL = 'http://localhost:8080/account/build';
const USER_NOTE_URL = 'http://localhost:8080/account/note';
const USER_RUNES_URL = 'http://localhost:8080/runes/update';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  constructor(
    private http: HttpClient,
  ) {
  }

  championId: string;

  getChampion(id: string) {
    return this.http.get(USER_CHAMPION_URL + id);
  }

  getChampionList(): Observable<{name: string}[]> {
    return this.http.get<{name: string}[]>(USER_CHAMPION_LIST_URL);
  }

  updateBuild(build: Build) {
    return this.http.put<Build>(USER_BUILD_URL, {championName: this.championId, build});
  }

  updateNote(note: Note) {
    return this.http.post<Note>(USER_NOTE_URL, {...note, championName: this.championId});
  }

  updateRunes(runePage: RunePage) {
    return this.http.put<RunePage>(USER_RUNES_URL, {runePage, championName: this.championId});
  }
}
