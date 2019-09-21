import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Build, Note} from './db.model';
import {RunePage} from '../../champion-details/components/section-runes/runes.model';
import {Observable} from 'rxjs';

const SERVER_URL = 'https://lol-workshop-server.herokuapp.com';
const USER_CHAMPION_LIST_URL = `${SERVER_URL}/account/champions`;
const USER_CHAMPION_URL = `${SERVER_URL}/account/champion/`;
const USER_BUILD_URL = `${SERVER_URL}/account/build`;
const USER_NOTE_URL = `${SERVER_URL}/account/note`;
const USER_RUNES_URL = `${SERVER_URL}/runes/update`;

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
