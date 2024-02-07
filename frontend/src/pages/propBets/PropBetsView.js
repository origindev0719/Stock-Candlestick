import { Link } from "react-router-dom";
import { Loading } from "../../components/LoadingComponent";
import { Navbar } from "../../components/Navbar"
import { Sidebar } from "../../components/Sidebar"
import {
  getMoneylineForTeam,
  getSpreadOrTotalGoalsForTeam,
  getTotalForTeam,
  getTotalRounds
} from "../../utils/sportStats/oddsFunctions";
import { PropBetsTable } from "./components/PropBetsTable";
import { BottomBar } from "../../components/BottomBar";

export const PropBetsView = (
  { data, 
    playersData, 
    liveGame, 
    //totalPlayersLoaded, 
    //setCurrentPage, 
    setTeamSelection, 
    showLoadMoreButton, 
    handleLoadMore 
  }) => {
  const game = data?.gameScore;
  const gameOdds = data?.gameOdds;
  const homeTeam = data.home_team_info;
  const awayTeam = data.away_team_info;

  const getFormattedRecord = (team) => {
    // Check for 'Win/Loss' records first
    const winLossAllGames = team?.records?.['Win/Loss']?.['Regular Season Games'];
    if (winLossAllGames) {
      return `${winLossAllGames.wins} - ${winLossAllGames.losses}`;
    }

    // If 'Win/Loss' records are not available, use 'ATS' records
    const atsAllGames = team?.records?.['Over/Under']?.['Regular Season Games'];
    if (atsAllGames) {
      return `${atsAllGames.wins} - ${atsAllGames.losses}`;
    }

    // If neither record type is available, return a placeholder or message
    return '';
  };

  const homeMoneyline = gameOdds?.odds ? getMoneylineForTeam(gameOdds?.odds, gameOdds?.home_team) : null;
  const awayMoneyline = gameOdds?.odds ? getMoneylineForTeam(gameOdds?.odds, gameOdds?.away_team) : null;

  const matchingSpreads = gameOdds?.odds ? getSpreadOrTotalGoalsForTeam(gameOdds?.odds, gameOdds?.home_team, gameOdds?.away_team, gameOdds?.sport) : null;

  const homeTotal = gameOdds?.odds ? getTotalForTeam(gameOdds?.odds, 'under') : null;
  const awayTotal = gameOdds?.odds ? getTotalForTeam(gameOdds?.odds, 'over') : null;

  const totalRounds = gameOdds?.odds ? getTotalRounds(gameOdds?.odds) : null
  const gameDate = game ? new Date(game.start_date).toLocaleDateString() : null;
  const gameTime = game ? new Date(game.start_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null;

  // Function to get the ordinal suffix for a given day
  const getOrdinalSuffix = (day) => {
    if (day % 10 === 1 && day !== 11) {
      return 'st';
    } else if (day % 10 === 2 && day !== 12) {
      return 'nd';
    } else if (day % 10 === 3 && day !== 13) {
      return 'rd';
    }
    return 'th';
  };

  // Extracting the day, month, and day of the week
  const gameDateObject = game ? new Date(game.start_date) : null;
  const dayOfWeek = gameDateObject ? gameDateObject.toLocaleDateString('en-US', { weekday: 'long' }) : null;
  const month = gameDateObject ? gameDateObject.toLocaleDateString('en-US', { month: 'long' }) : null;
  const day = gameDateObject ? gameDateObject.getDate() : null;

  // Combining to get the desired format
  const gameDate2 = gameDateObject ? `${dayOfWeek}, ${month} ${day}${getOrdinalSuffix(day)}` : null;

  return (
    <div className="w-full h-screen bg-neutral-50 flex flex-row overflow-hidden">
      <Sidebar />
      {data && playersData ? (
        <div className="flex flex-col w-full overflow-y-auto overflow-x-hidden">
          <div className="sticky top-0 z-10 bg-white">
            <Navbar title='Sports' />
          </div>
          <div className="lg:mt-10 lg:ml-10 flex flex-col lg:flex-row w-full justify-center items-center lg:items-start gap-3">
            <div className="flex flex-col w-9/12 md:w-1/2 lg:w-1/4">
              <div className="w-full h-32 flex flex-col items-center justify-center bg-white p-4 mb-5 drop-shadow-sm">
                <div className="w-full flex justify-center items-center drop-shadow-md">
                  <span className="text-neutral-500 text-xs font-normal mb-2">
                    {game.season_year} {game.league} {game.season_type}
                  </span>
                </div>
                <div className="flex flex-row w-full justify-between items-center">
                <Link to={`/sports/team/${awayTeam.id}`} className="flex flex-col items-center">
                    <img className="w-9 h-9 mb-1 object-cover" src={awayTeam.logo} alt={awayTeam.team_name} />
                    <span className="text-black text-xs font-semibold leading-tight mb-1">{awayTeam.team_abbreviation}</span>
                    <span className="text-neutral-500 text-xs font-normal leading-tight">
                      {awayTeam?.records ? getFormattedRecord(awayTeam) : 'Loading...'}
                    </span>
                  </Link>
                  <div className="flex flex-col items-center text-center">
                    {
                      game.is_live && liveGame ? (
                        <div className="flex flex-row justify-around">
                          <h2>{liveGame.score_home_total}</h2>
                          <span>Final</span>
                          <h2>{liveGame.score_away_total}</h2>
                        </div>
                      ) : (
                        <span className="text-black text-xs font-medium leading-tight mb-2">{gameDate}<br />{gameTime}</span>
                      )
                    }
                  </div>
                  <Link to={`/sports/team/${homeTeam.id}`} className="flex flex-col items-center">
                    <img className="w-9 h-9 mb-1 object-cover" src={homeTeam.logo} alt={homeTeam.team_name} />
                    <span className="text-black text-xs font-semibold leading-tight mb-1">
                      {homeTeam.team_abbreviation}
                    </span>
                    <span className="text-neutral-500 text-xs font-normal leading-tight">
                      {homeTeam?.records ? getFormattedRecord(homeTeam) : 'Loading...'}
                    </span>
                  </Link>
                </div>
              </div>

              <div className="w-full h-44 bg-white flex flex-col">
                <span className="h-10 px-6 bg-neutral-900 rounded-t-lg flex items-center text-white text-sm xl:text-base font-semibold uppercase">
                  {gameDate2}
                </span>
                <div className="w-full h-28 flex flex-col pt-4">
                  <div className="w-full h-20 flex flex-row items-center">
                    <div className="w-1/6 h-20 flex flex-col items-center justify-center text-justify text-zinc-500 text-sm xl:text-base font-normal">
                      <span>{gameTime}</span>
                    </div>
                    <div className="w-5/6 h-20 flex flex-col justify-between items-end pr-2">
                      <div className="flex flex-row items-center justify-around w-full">
                        <span className="text-indigo-950 text-sm xl:text-base mr-7 font-medium">{homeTeam.team_abbreviation}</span>
                        <div className="flex flex-row items-center gap-4 lg:gap-6 xl:gap-8 2xl:gap-10">
                          <div className="flex items-center gap-3">
                            <span className="text-zinc-500 text-sm xl:text-base font-normal">
                              {matchingSpreads?.homeOdds?.selection_points}
                            </span>
                            <span className="text-zinc-400 text-sm xl:text-base font-normal">{matchingSpreads?.homeOdds?.price}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-zinc-500 text-sm xl:text-base font-normal whitespace-nowrap">
                              {homeTotal?.selection_points ?
                                `U  ${homeTotal?.selection_points}` :
                                (totalRounds?.selection_points ? totalRounds?.selection_points : homeMoneyline?.selection_points)}
                            </span>
                            <span className="text-zinc-400 text-sm xl:text-base font-normal font-['Noto Sans']">
                              {homeTotal?.price ? homeTotal?.price : (totalRounds?.price ? totalRounds?.price : homeMoneyline?.price)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="w-full h-px bg-slate-200 rounded-lg"></div>
                      <div className="flex flex-row items-center justify-around w-full">
                        <span className="text-indigo-950 text-sm xl:text-base mr-7 font-medium">{awayTeam.team_abbreviation}</span>
                        <div className="flex flex-row items-center gap-4 lg:gap-6 xl:gap-8 2xl:gap-10">
                          <div className="flex items-center gap-3">
                            <span className="text-zinc-500 text-sm xl:text-base font-normal">{matchingSpreads?.awayOdds?.selection_points}</span>
                            <span className="text-zinc-400 text-sm xl:text-base font-normal">{matchingSpreads?.awayOdds?.price}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-zinc-500 text-sm xl:text-base font-normal whitespace-nowrap">
                              {awayTotal?.selection_points ? `O  ${awayTotal?.selection_points}` : totalRounds?.selection_points}
                            </span>
                            <span className="text-zinc-400 text-sm xl:text-base font-normal font-['Noto Sans']">
                              {awayTotal?.price ? awayTotal?.price : (totalRounds?.price ? totalRounds?.price : awayMoneyline.price)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="w-full h-px bg-slate-200 rounded-lg"></div>
                    </div>
                  </div>
                  <div className="w-full h-10 flex items-center justify-between mt-3">
                    <span className="text-neutral-900 text-sm xl:text-base font-normal capitalize px-4">matchup</span>
                    <span className="text-neutral-900 text-sm xl:text-base font-normal capitalize px-4">Line history</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:ml-10 w-11/12 lg:w-2/3">
              <PropBetsTable data={data} playersData={playersData} setTeamSelection={setTeamSelection} />
              {/*
                showLoadMoreButton && (
                    <div className="my-7 p-5 w-full justify-center items-center">
                        <button
                            className="flex h-10 p-3 text-sm xl:text-base font-medium text-center items-center justify-center rounded-lg bg-gray-300"
                            onClick={handleLoadMore}
                        >
                            Load More
                        </button>
                    </div>
                )
              */}
            </div>
          </div>
        </div>
      ) : (
        <div className="content h-screen w-screen flex items-center justify-center bg-white animate-bg">
          <Loading />
        </div>
      )}
      <BottomBar />
    </div>
  )
}