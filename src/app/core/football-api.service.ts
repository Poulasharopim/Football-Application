import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take, tap } from 'rxjs';
import { Standings } from './models/standings.model';
import { GeneralMapper } from './general-mapper';
import { Fixtures } from './models/fixtures.model';
import { ApiUrls } from './enums/api-urls.enum';
import { MenuItem } from 'primeng/api';
import { StandingsResponse } from './models/standings-response.model';
import { FixtureResponse } from './models/fixtures-response.model';

@Injectable({
  providedIn: 'root'
})
export class FootballApiService {
  standingsInfo$: BehaviorSubject<Standings[]> = new BehaviorSubject([{
    rank: 0,
    name: '',
    logo: '',
    gamesPlayed: 0,
    gamesWin: 0,
    gamesLose: 0,
    gamesDraw: 0,
    goalDiff: 0,
    points: 0,
    teamId: 0,   
}]);
  fixturesInfo$: BehaviorSubject<Fixtures[]> = new BehaviorSubject([{
    firstTeamName: '',
    secondTeamName: '',
    firstTeamScore: 0,
    secondTeamScore: 0,
    firstTeamLogo: '',
    secondTeamLogo: ''
}]);
  private _activeItem: MenuItem = {};
  
  private _topLeagueId: number = 39; 
  
  httpOptions = {
    headers: new HttpHeaders({ 
    })
  };


  constructor(private httpClient:HttpClient, private generalMapper:GeneralMapper) { }

  getStandings(leagueId:number): Observable<Standings[]> {
    const date = new Date();
    const season = date.getFullYear();
    const params = new HttpParams().set('league',leagueId).set('season',season);
    const standingsResponse = this.httpClient.get<StandingsResponse>(ApiUrls.Standings,{...this.httpOptions,params})
    .pipe(take(1))

    return standingsResponse.pipe(map((res)=>{
      const formatedStandings: Standings[] = this.generalMapper.mapToStandings(res);
      this.standingsInfo$.next(formatedStandings);
      return formatedStandings;
    }))

  }

  getFixture(teamId:number): Observable<Fixtures[]> {
    const date = new Date();
    const season = date.getFullYear();
    const params = new HttpParams().set('team',teamId).set('season',season).set('last',10)
    const fixturesResponse = this.httpClient.get<FixtureResponse>(ApiUrls.Fixtures,{...this.httpOptions,params})
    .pipe(take(1))

    return fixturesResponse.pipe(map((res)=>{
      const formatedFixtures: Fixtures[] = this.generalMapper.mapToFixture(res);
      this.fixturesInfo$.next(formatedFixtures);
      return formatedFixtures;
    }))
  }


  public get topLeagueId(): number {
    return this._topLeagueId;
  }
  public set topLeagueId(value: number) {
    this._topLeagueId = value;
  }

  public get activeItem(): MenuItem {
    return this._activeItem;
  }
  public set activeItem(value: MenuItem) {
    this._activeItem = value;
  }

}
