import { useSelector } from "react-redux";
import { icons } from "../assets"
import { useEffect, useState } from "react";
import { getSpreadOrTotalGoalsForTeam, getTotalForTeam, getTotalRounds } from "../utils/sportStats/oddsFunctions";
import { Loading } from "./LoadingComponent";
import { Link } from "react-router-dom";

export const Matchup = ({ setMatchupLoaded }) => {
  const matchupsFromStore = useSelector(state => state.getUpcomingMatchups.matchups['NBA']);
  const [upcomingMatchups, setUpcomingMatchups] = useState([])

  const firstGame = matchupsFromStore ? matchupsFromStore[0] : null

  function getGamesByDays(gamesArray) {
    // Helper function to parse the date and ignore the time
    const parseDate = dateString => dateString.split('T')[0];

    // Object to hold the games grouped by date
    const gamesByDate = {};

    // Iterate over the games array to group games by date
    gamesArray.forEach(game => {
      const date = parseDate(game.start_date);
      if (!gamesByDate[date]) {
        gamesByDate[date] = []; // Initialize an array if it doesn't exist
      }
      gamesByDate[date].push({
        game
      });
    });

    return gamesByDate;
  }

  useEffect(() => {
    if (matchupsFromStore?.length > 0) {
      const upcoming = getGamesByDays(matchupsFromStore);
      // Assuming you want to set the games for the first date returned by getGamesByDays
      const firstDate = Object.keys(upcoming)[1];
      setUpcomingMatchups(upcoming[firstDate]);
      setMatchupLoaded(true)
    }
  }, [matchupsFromStore]);

  function formatDate(date) {
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
    const gameDateObject = date ? new Date(date) : null;
    const dayOfWeek = gameDateObject ? gameDateObject.toLocaleDateString('en-US', { weekday: 'long' }) : null;
    const month = gameDateObject ? gameDateObject.toLocaleDateString('en-US', { month: 'long' }) : null;
    const day = gameDateObject ? gameDateObject.getDate() : null;

    // Combining to get the desired format
    return gameDateObject ? `${dayOfWeek}, ${month} ${day}${getOrdinalSuffix(day)}` : null;
  }

  return (
    firstGame ? (
      <div className="flex flex-col items-center gap-3 w-full h-full ml-5">
        <div className="flex justify-between items-center w-full text-lg font-extrabold uppercase">
          <div className="flex justify-around items-center w-1/3 text-sm">
            <span className="text-zinc-500">{firstGame?.home_team_abb}</span>
            <span className="text-violet-900">vs</span>
            <span className="text-zinc-500">{firstGame?.away_team_abb}</span>
          </div>

          <Link to={`/sports/propBets/${firstGame.game_id}`} className="flex justify-end items-center w-1/3">
            <span className="text-center text-gray text-sm font-bold uppercase  mr-2">matchup</span>
            <div className="w-5 h-5">
              <div className="w-5 h-5 bg-slate-100 rounded-full flex justify-center mt-1">
                <img className="w-3 h-3" src={icons.chevronRight} alt="img" />
              </div>
            </div>
          </Link>
        </div>

        <div className="flex flex-col items-start bg-white w-full h-48 mb-6">
          <div className="flex justify-between items-center rounded-t-lg w-full h-10 p-3 bg-neutral-900">
            <span className="text-white text-sm font-semibold uppercase">
              {
                new Date(firstGame.start_date).toDateString() !== new Date().toDateString() ?
                  new Date(firstGame.start_date).toLocaleDateString() :
                  new Date(firstGame.start_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            </span>
            <span className="text-white text-sm font-semibold uppercase">ATS</span>
          </div>

          <div className="w-full flex flex-col bg-white">
            <div className="flex items-center justify-between p-3 bg-neutral-50">
              <span className="text-indigo-950  text-base font-normal">Predicted Score:</span>
              <span className="text-zinc-500">95 - 92</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-neutral-50">
              <span>Computer Pick</span>
              <span className="text-zinc-500">{firstGame?.home_team_abb} (-2.5)</span>
            </div>
            <div className="flex items-center justify-between p-3">
              <span>Public Consensus</span>
              <span className="text-zinc-500">{firstGame?.home_team_abb} (-2.5)</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-neutral-50">
              <span>Consensus Bet %</span>
              <span className="text-zinc-500">{firstGame?.home_team_abb} (72%)</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full bg-white rounded-t-lg h-full my-5">
          <span className="px-6 py-2 rounded-t-lg bg-neutral-900 text-white text-sm font-semibold uppercase">
            {formatDate(firstGame.start_date)}
          </span>
          <div className="flex flex-col w-full">
            {
              matchupsFromStore && matchupsFromStore?.length > 0 && matchupsFromStore?.slice(5).map((game, index) => {
                if (!game || !game?.odds || !game?.odds?.odds || game?.odds?.odds.length === 0) return null;

                //const homeMoneyline = getMoneylineForTeam(game.odds.odds, game.home_team);
                //const awayMoneyline = getMoneylineForTeam(game.odds.odds, game.away_team);

                const matchingSpreads = getSpreadOrTotalGoalsForTeam(game?.odds?.odds, game?.home_team, game?.away_team, game?.sport);

                const homeTotal = getTotalForTeam(game?.odds?.odds, 'under');
                const awayTotal = getTotalForTeam(game?.odds?.odds, 'over');

                const totalRounds = getTotalRounds(game?.odds?.odds)

                return (
                  <div className="flex flex-col w-full" key={index}>
                    <div className="flex flex-row w-full">
                      <span className="flex items-center p-2 w-1/6 text-zinc-500 text-base md:text-sm lg:text-base">
                        {new Date(game.start_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <div className="flex flex-col w-5/6">
                        <div className="flex justify-between items-center p-3 bg-neutral-50 text-zinc-500">
                          <span className="text-indigo-950 text-base md:text-sm lg:text-base font-medium">{game.away_team_abb}</span>
                          <div className="flex items-center gap-10 md:gap-5 lg:gap-10">
                            <div className="flex items-center gap-3 text-base md:text-sm lg:text-base">
                              <span>{matchingSpreads?.awayOdds?.selection_points}</span>
                              <span className="text-zinc-400">{matchingSpreads?.awayOdds?.price}</span>
                            </div>
                            <div className="flex items-center gap-3 text-base md:text-sm lg:text-base">
                              <span>{awayTotal?.selection_points ? `O${awayTotal?.selection_points}` : totalRounds?.selection_points}</span>
                              <span className="text-zinc-400">{awayTotal?.price ? awayTotal?.price : totalRounds?.price}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white text-zinc-500">
                          <span className="text-indigo-950 text-base md:text-sm lg:text-base font-medium">{game.home_team_abb}</span>
                          <div className="flex items-center gap-10 md:gap-5 lg:gap-10">
                            <div className="flex items-center gap-3 text-base md:text-sm lg:text-base">
                              <span>{matchingSpreads?.homeOdds?.selection_points}</span>
                              <span className="text-zinc-400">{matchingSpreads?.homeOdds?.price}</span>
                            </div>
                            <div className="flex items-center gap-3 text-base md:text-sm lg:text-base">
                              <span>{homeTotal?.selection_points ? `U${homeTotal?.selection_points}` : totalRounds?.selection_points}</span>
                              <span className="text-zinc-400">{homeTotal?.price ? homeTotal?.price : totalRounds?.price}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mx-6 p-3 bg-neutral-50 text-neutral-900 text-sm">
                      <span>Matchup</span>
                      <span>Line History</span>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>

        {upcomingMatchups && upcomingMatchups.length > 0 && upcomingMatchups[0]?.game?.odds?.odds.length > 0 ? (
          <div className="flex flex-col w-full bg-white rounded-t-lg h-full mt-5">
            <div className="flex justify-between items-center px-6 py-3 rounded-t-lg bg-neutral-900 text-white text-sm font-semibold uppercase">
              {formatDate(upcomingMatchups[0]?.game?.start_date)}
            </div>
            <div className="flex flex-col w-full">
              {
                upcomingMatchups && upcomingMatchups.length > 0 && upcomingMatchups.map((game, index) => {
                  if (!game || !game.game?.odds || !game.game?.odds?.odds[0]) return null;

                  //const homeMoneyline = getMoneylineForTeam(game.game?.odds.odds, game.game?.home_team);
                  //const awayMoneyline = getMoneylineForTeam(game.game?.odds.odds, game.game?.away_team);

                  const matchingSpreads = getSpreadOrTotalGoalsForTeam(game.game.odds.odds, game.game.home_team, game.game.away_team, game.game.sport);

                  const homeTotal = getTotalForTeam(game.game?.odds?.odds, 'under');
                  const awayTotal = getTotalForTeam(game.game?.odds?.odds, 'over');

                  const totalRounds = getTotalRounds(game.game?.odds?.odds)

                  return (
                    <div className="flex flex-col w-full" key={index}>
                      <div className="flex flex-row w-full">
                        <span className="flex items-center p-2 w-1/6 text-zinc-500 text-base md:text-sm lg:text-base">
                          {new Date(game.game?.start_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <div className="flex flex-col w-5/6">
                          <div className="flex justify-between items-center p-3 bg-neutral-50 text-zinc-500">
                            <span className="text-indigo-950 text-base md:text-sm lg:text-base font-medium">{game.game?.away_team_abb}</span>
                            <div className="flex items-center gap-10 md:gap-5 lg:gap-10">
                              <div className="flex items-center gap-3 text-base md:text-sm lg:text-base">
                                <span>{matchingSpreads?.awayOdds?.selection_points}</span>
                                <span className="text-zinc-400">{matchingSpreads?.awayOdds?.price}</span>
                              </div>
                              <div className="flex items-center gap-3 text-base md:text-sm lg:text-base">
                                <span>{awayTotal?.selection_points ? awayTotal?.selection_points : totalRounds?.selection_points}</span>
                                <span className="text-zinc-400">{awayTotal?.price ? awayTotal?.price : totalRounds?.price}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-white text-zinc-500">
                            <span className="text-indigo-950 text-base md:text-sm lg:text-base font-medium">{game.game?.home_team_abb}</span>
                            <div className="flex items-center gap-10 md:gap-5 lg:gap-10">
                              <div className="flex items-center gap-3 text-base md:text-sm lg:text-base">
                                <span>{matchingSpreads?.homeOdds?.selection_points}</span>
                                <span className="text-zinc-400">{matchingSpreads?.homeOdds?.price}</span>
                              </div>
                              <div className="flex items-center gap-3 text-base md:text-sm lg:text-base">
                                <span>{homeTotal?.selection_points ? homeTotal?.selection_points : totalRounds?.selection_points}</span>
                                <span className="text-zinc-400">{homeTotal?.price ? homeTotal?.price : totalRounds?.price}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mx-6 p-3 bg-neutral-50 text-neutral-900 text-sm">
                        <span>Matchup</span>
                        <span>Line History</span>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        ) : null}
      </div>
    ) : (
      <div className="content h-full w-full flex items-center justify-center bg-white animate-bg">
        <Loading />
      </div>
    ))
}