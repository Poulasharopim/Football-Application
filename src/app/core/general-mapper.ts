import { Injectable } from '@angular/core';
import { Standings } from './models/standings.model';
import { Fixtures } from './models/fixtures.model';
import { StandingsResponse } from './models/standings-response.model';
import { FixtureResponse } from './models/fixtures-response.model';
import { UnformattedStandings } from './models/unformatted-standings.model';
import { UnformattedFixture } from './models/unformatted-fixtures.model';

@Injectable({
    providedIn: 'root'
  })

export class GeneralMapper {
    constructor(){}

    mapToStandings(sourceJson: StandingsResponse):Standings[]{
        let standings: Standings[] = [];
        standings = sourceJson.response[0].league.standings[0].map((unformatedStandings:UnformattedStandings)=>{
            const formatedstandings : Standings = {
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
            }
            formatedstandings.rank = unformatedStandings.rank;
            formatedstandings.teamId = unformatedStandings.team.id;
            formatedstandings.name = unformatedStandings.team.name;
            formatedstandings.logo = unformatedStandings.team.logo;
            formatedstandings.points = unformatedStandings.points;
            formatedstandings.goalDiff = unformatedStandings.goalsDiff;
            formatedstandings.gamesPlayed = unformatedStandings.all.played;
            formatedstandings.gamesWin = unformatedStandings.all.win; 
            formatedstandings.gamesLose = unformatedStandings.all.lose; 
            formatedstandings.gamesDraw = unformatedStandings.all.draw;
            return formatedstandings
        })

        return standings;

    }

    mapToFixture(sourceJson:FixtureResponse):Fixtures[]{
        let fixtures: Fixtures[] = [];
        fixtures = sourceJson.response.map((unformatedFixtures:UnformattedFixture)=>{
            const formatedFixtures: Fixtures = {
                firstTeamName: '',
                secondTeamName: '',
                firstTeamScore: 0,
                secondTeamScore: 0,
                firstTeamLogo: '',
                secondTeamLogo: ''
            }
            formatedFixtures.firstTeamName = unformatedFixtures.teams.home.name;
            formatedFixtures.secondTeamName = unformatedFixtures.teams.away.name;
            formatedFixtures.firstTeamLogo = unformatedFixtures.teams.home.logo;
            formatedFixtures.secondTeamLogo = unformatedFixtures.teams.away.logo;
            formatedFixtures.firstTeamScore = unformatedFixtures.goals.home;
            formatedFixtures.secondTeamScore = unformatedFixtures.goals.away;
            return formatedFixtures;

        })

        return fixtures;
    }
}
