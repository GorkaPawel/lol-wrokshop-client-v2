import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/internal/operators/tap';
import {Observable} from 'rxjs';
import {ApiChampion, ApiItem, ID} from './api.model';

const SERVER_URL = 'https://lol-workshop-server.herokuapp.com';

const CHAMPION_LIST_URL = `${SERVER_URL}/champions`;
const CHAMPION_URL = `${SERVER_URL}/champion/`;
const ITEM_LIST_URL = `${SERVER_URL}/items`;
const ITEM_URL = `${SERVER_URL}/item/`;
const RUNES_URL = `${SERVER_URL}/runes`;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {
    this.http.get<ID[]>(CHAMPION_LIST_URL).subscribe((list: ID[]) => {
      this.championList = list;
    });
    this.http.get<ID[]>(ITEM_LIST_URL).subscribe((list: ID[]) => {
      this.itemList = list;
    });
  }

  get _championList() {
    return this.championList;
  }

  private championList: ID[];
  private itemList: ID[];


  find(searchTerm: string, option: { champion: boolean }) {
    if (!searchTerm) {
      return [];
    }
    if (option.champion) {
      return this.championList.filter((item: ID) => {
        return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0;
      });
    }
    return this.itemList.filter((item: ID) => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0;
    });
  }

  getChampion(name: string): Observable<ApiChampion> {
    return this.http.get<ApiChampion>(`${CHAMPION_URL}${name}`)
      .pipe(
        tap((champion: ApiChampion) => {
        })
      );
  }

  getItem(id: string): Observable<ApiItem> {
    return this.http.get<ApiItem>(`${ITEM_URL}${id}`)
      .pipe(
        tap((item: ApiItem) => {
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
