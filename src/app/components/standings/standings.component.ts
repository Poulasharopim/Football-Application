import { Component, Input } from '@angular/core';
import { Standings } from '../../core/models/standings.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent {

  @Input() standings!: Standings[];
  constructor(private router:Router){}

  goToTeamStatistics(teamId:number) {
    this.router.navigate(['/team/',teamId]);
  }
}
