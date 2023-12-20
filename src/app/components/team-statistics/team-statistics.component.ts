import { Component, Input, OnInit } from '@angular/core';
import { Fixtures } from '../../core/models/fixtures.model';
import { ActivatedRoute } from '@angular/router';
import { FootballApiService } from '../../core/football-api.service';
import { GeneralMapper } from '../../core/general-mapper';

@Component({
  selector: 'app-team-statistics',
  templateUrl: './team-statistics.component.html',
  styleUrls: ['./team-statistics.component.scss']
})
export class TeamStatisticsComponent implements OnInit {
  @Input() fixtures!: Fixtures[];
  id! : number;

  constructor(private activatedRoute: ActivatedRoute, private footballApiService: FootballApiService, private generalMapper: GeneralMapper){}

  ngOnInit(){
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getFixture(this.id);
  }

  getFixture(teamId:number){
    this.footballApiService.getFixture(teamId).subscribe((res)=>{
      this.fixtures = res;
    })
  }

}
