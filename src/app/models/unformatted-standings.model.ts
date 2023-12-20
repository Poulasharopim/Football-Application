export interface UnformattedStandings{
    rank:number,
    team:{
        id:number,
        name:string,
        logo:string,
    },
    points:number,
    goalsDiff:number,
    all:{
        played:number,
        win:number,
        lose:number,
        draw:number
    }
}