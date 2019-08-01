import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Champion, HasIdentity} from '../models/champions';
import {tap} from 'rxjs/internal/operators/tap';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChampionsDataService {

  private championListURL = 'http://localhost:8080/championList/';
  private championURL = 'http://localhost:8080/champion/';


  constructor(private http: HttpClient) {
  }

  getChampionList(searchTerm: string) {
    if (!searchTerm) {
      return of([]);
    }
    return this.http.get(`${this.championListURL}${searchTerm}`)
      .pipe(
        tap((championList: Array<Champion>) => {
          console.log('Got champion list: ', championList);
        })
      );

  }

  getChampion(champId: string) {
    return this.http.get(`${this.championURL}${champId}`)
      .pipe(
        tap((champ: HasIdentity) => {
          console.log(champ);
        })
      );
  }

  generateSpellImgUrl(apiUrl: string, name: string): string {
    const baseUrl = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/characters/${name}/hud/icons2d/`;
    const regex = /\w+\.png/;
    return (baseUrl + apiUrl.match(regex)[0]).toLowerCase();
  }
}
