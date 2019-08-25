import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/internal/operators/tap';
import {Observable} from 'rxjs';
import {ApiChampion, ApiItem, ID} from './api.model';

const CHAMPION_LIST_URL = 'http://localhost:8080/champions';
const CHAMPION_URL = 'http://localhost:8080/champion/';
const ITEM_LIST_URL = 'http://localhost:8080/items';
const ITEM_URL = 'http://localhost:8080/item/';
const RUNES_URL = 'http://localhost:8080/runes';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {
    this.http.get<ID[]>(CHAMPION_LIST_URL).subscribe((list: ID[]) => {
      this.championList = list;
      console.log('Champion list: ', this.championList);
    });
    this.http.get<ID[]>(ITEM_LIST_URL).subscribe((list: ID[]) => {
      this.itemList = list;
      console.log('Item list: ', this.itemList);
    });
  }

  private championList: ID[];
  private itemList: ID[];


  find(searchTerm: string, option: { champion: boolean }) {
    const term = searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1);
    if (option.champion) {
      return this.championList.filter((item: ID) => {
        return item.name.startsWith(term);
      });
    }
    return this.itemList.filter((item: ID) => {
      return item.name.startsWith(term);
    });
  }

  getChampion(name: string): Observable<ApiChampion> {
    return this.http.get<ApiChampion>(`${CHAMPION_URL}${name}`)
      .pipe(
        tap((champion: ApiChampion) => {
          console.log('API champion: ', champion);
        })
      );
  }

  getItem(id: string): Observable<ApiItem> {
    return this.http.get<ApiItem>(`${ITEM_URL}${id}`)
      .pipe(
        tap((item: ApiItem) => {
          console.log('API item: ', item);
        })
      );
  }
  getRunes(): Observable<any> {
    return this.http.get(RUNES_URL);
  }

  generateSpellImgUrl(apiUrl: string, name: string): string {
    const baseUrl = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/characters/${name}/hud/icons2d/`;
    const regex = /\w+\.png/;
    return (baseUrl + apiUrl.match(regex)[0]).toLowerCase();
  }
}
