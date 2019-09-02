import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/internal/operators/tap';
import {Build, Note, UserChampion} from './db.model';
import {RunePage} from '../../champion-details/components/section-runes/runes.model';
import {ActivatedRoute, Router} from '@angular/router';

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
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  championId: string;

  getChampion(id: string) {
    return this.http.get(USER_CHAMPION_URL + id)
      .pipe(tap((champion: UserChampion) => console.log('DB champion: ', champion)));
  }

  getChampionList(id: string) {
    return this.http.get(USER_CHAMPION_LIST_URL + id)
      .pipe(tap((champion: UserChampion) => console.log('DB champion: ', champion)));
  }


  updateBuild(build: Build) {
    this.http.put<Build>(USER_BUILD_URL, {championName: this.championId, build}).subscribe();
  }

  updateNote(note: Note) {
    this.http.post<Note>(USER_NOTE_URL, {...note, championName: this.championId}).subscribe();
  }

  updateRunes(runePage: RunePage) {
    return this.http.put<RunePage>(USER_RUNES_URL, {runePage, championName: this.championId});
  }
}
