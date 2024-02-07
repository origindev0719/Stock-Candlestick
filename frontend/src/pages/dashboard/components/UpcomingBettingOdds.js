import { Link } from "react-router-dom";
import { getMoneylineForTeam, getSpreadOrTotalGoalsForTeam, getTotalForTeam, getTotalRounds } from "../../../utils/sportStats/oddsFunctions";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const UpcomingBettingOdds = ({selectedButton}) => {
  const matchupsFromStore = useSelector(state => state.getUpcomingMatchups.matchups[selectedButton]);
  const [upcomingMatchups, setUpcomingMatchups] = useState([])

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

      const firstDate = Object.keys(upcoming)[0];
      setUpcomingMatchups(upcoming[firstDate]);
    }
  }, [matchupsFromStore]);

  return (
    <div className="w-full rounded-lg overflow-hidden">
      <div className="bg-black text-white py-3 pl-6 font-semibold text-sm uppercase">
        <span className="font-manrope">{formatDate(upcomingMatchups[0]?.game?.start_date)}</span>
      </div>

      <div className="w-full flex flex-col">
        {upcomingMatchups && upcomingMatchups.length > 0 && upcomingMatchups.map((game, index) => {
          if (!game.game || !game.game.odds || !game.game.odds?.odds[0]) return null;

          const homeMoneyline = getMoneylineForTeam(game.game.odds.odds, game.game.home_team);
          const awayMoneyline = getMoneylineForTeam(game.game.odds.odds, game.game.away_team);

          const matchingSpreads = getSpreadOrTotalGoalsForTeam(game.game.odds.odds, game.game.home_team, game.game.away_team, game.game.sport);

          const homeTotal = getTotalForTeam(game.game.odds.odds, 'under');
          const awayTotal = getTotalForTeam(game.game.odds.odds, 'over');

          const totalRounds = getTotalRounds(game.game.odds.odds);

           // Check if the game's sport is MMA, and conditionally render the Link or a div
           const isMMA = game.game.sport === 'mma';
          const WrapperComponent = isMMA ? 'div' : Link;
          const wrapperProps = isMMA ? {} : { to: `/sports/propBets/${game.game.id}` };


          return (
            <div key={index} className="bg-neutral-50 shadow">
              <div className="h-1/3 mt-2">
                <div className="w-full bg-white flex items-center">
                  <div className="w-44 ml-5 flex items-center space-x-10">
                    <WrapperComponent key={index} {...wrapperProps} className="w-14 h-5 flex flex-col justify-start items-start">
                      <span className="text-zinc-400 text-sm font-normal capitalize">matchup</span>
                    </WrapperComponent>
                  </div>
                </div>
              </div>
              <WrapperComponent 
                key={index} 
                {...wrapperProps} 
                className="grid grid-cols-10 bg-white items-center py-3"
              >
                <div className="col-span-2 text-center">
                  <span className="flex justify-center items-center text-zinc-500 text-xs xs:text-sm font-normal">
                    {
                      new Date(game.game.start_date).toDateString() !== new Date().toDateString() ?
                        new Date(game.game.start_date).toLocaleDateString() :
                        new Date(game.game.start_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    }
                  </span>
                </div>

                {/* Team Name */}
                <div className="col-span-2 flex flex-col items-start h-14 justify-between">
                  <span className="text-indigo-950 text-xs xs:text-sm sm:text-base font-medium">{game.game.away_team}</span>
                  <span className="text-indigo-950 text-xs xs:text-sm sm:text-base font-medium">{game.game.home_team}</span>
                </div>

                {/* Moneyline */}
                <div className="col-span-1 sm:col-span-2 ml-2 sm:ml-6">
                  <div className="flex justify-center items-center space-x-3 mb-3">
                    <span className="text-zinc-500 text-xs xs:text-sm sm:text-base font-normal">{awayMoneyline?.price}</span>
                  </div>
                  <div className="flex justify-center items-center space-x-3">
                    <span className="text-zinc-500 text-xs xs:text-sm sm:text-base font-normal">{homeMoneyline?.price}</span>
                  </div>
                </div>

                {/* Spread */}
                <div className="col-span-2 ml-2 sm:ml-6">
                  <div className="flex justify-around items-center space-x-3 mb-3">
                    <span className="text-zinc-500 text-xs xs:text-sm sm:text-base font-normal">{matchingSpreads?.awayOdds?.selection_points}</span>
                    <span className="text-zinc-400 text-xs xs:text-sm sm:text-base font-normal">{matchingSpreads?.awayOdds?.price}</span>
                  </div>
                  <div className="flex justify-around items-center space-x-3">
                    <span className="text-zinc-500 text-xs xs:text-sm sm:text-base font-normal">{matchingSpreads?.homeOdds?.selection_points}</span>
                    <span className="text-zinc-400 text-xs xs:text-sm sm:text-base font-normal">{matchingSpreads?.homeOdds?.price}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="col-span-3 sm:col-span-2 ml-2 sm:ml-6">
                  <div className="flex justify-around items-center space-x-3 mb-3">
                    <span className="text-zinc-500 text-xs xs:text-sm sm:text-base font-normal">{awayTotal ? `O  ${awayTotal?.selection_points}` : null}</span>
                    <span className="text-zinc-400 text-xs xs:text-sm sm:text-base font-normal">{awayTotal?.price}</span>
                  </div>
                  <div className="flex justify-around items-center space-x-3">
                    <span className="text-zinc-500 text-xs xs:text-sm sm:text-base font-normal">{homeTotal ? `U  ${homeTotal?.selection_points}` : null}</span>
                    <span className="text-zinc-400 text-xs xs:text-sm sm:text-base font-normal">{homeTotal?.price}</span>
                  </div>
                </div>
              </WrapperComponent>
            </div>
          )
        })}
      </div>
    </div>
  )
}