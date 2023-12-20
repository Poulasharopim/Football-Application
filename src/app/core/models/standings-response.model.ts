import { UnformattedStandings } from "./unformatted-standings.model"

export interface StandingsResponse{
    response:[{
        league:{
            standings:[UnformattedStandings[]]
        }
    }]
}
