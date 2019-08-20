import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/internal/operators/tap';
import {Build, Note, UserChampion} from './db.model';

const USER_CHAMPION_LIST_URL = 'http://localhost:8080/account/champions';
const USER_CHAMPION_URL = 'http://localhost:8080/account/champion/';
const USER_BUILD_URL = 'http://localhost:8080/account/build';
const USER_NOTE_URL = 'http://localhost:8080/account/note';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  constructor(private http: HttpClient) {
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
}
