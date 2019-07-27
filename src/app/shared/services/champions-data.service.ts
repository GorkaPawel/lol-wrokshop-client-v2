import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Champion} from '../models/champions';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChampionsDataService {

  private champListURL = 'http://localhost:8080/championList';
  private champURL = 'http://localhost:8080/champion/';
  championList: Array<Champion>;


  constructor(private http: HttpClient) {
    this.getChampionList();
  }

  private getChampionList() {
    this.http.get(this.champListURL)
      .subscribe((list: Array<Champion>) => {
        this.championList = list;
        console.log('Champion service: got champion list');
      });
  }

  public findChampion(term: string): Array<Champion> {
    if (!term) {
      return [];
    }
    const matchedChampions =
      this.championList.filter((champion: Champion) => {
        return champion.championName.startsWith(term);
      });
    return matchedChampions;
  }

  public getChampion(champId: string) {
    return this.http.get(`${this.champURL}${champId}`)
      .pipe(
        map((requestData: {data: any}) => {
          return requestData.data[champId];
        })
      );
  }
}
