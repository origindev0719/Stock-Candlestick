import { Link } from "react-router-dom";
import { getMoneylineForTeam, getSpreadOrTotalGoalsForTeam, getTotalForTeam, getTotalRounds } from "../../../utils/sportStats/oddsFunctions";
import { Loading } from "../../../components/LoadingComponent";

export const OddsTable = ({ oddsData }) => {
  return (
    oddsData && oddsData.length > 0 ? (
      <div className="w-full rounded-lg overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-10 bg-black text-white text-sm lg:text-base font-semibold py-3">
          <div className="col-span-2 text-center">Date/Time</div>
          <div className="col-span-2">Team</div>
          <div className="col-span-2 text-center">Moneyline</div>
          <div className="col-span-2 text-center">Spread</div>
          <div className="col-span-2 text-center">Total</div>
        </div>

        {/* Data Rows */}
        {
          oddsData && oddsData.length > 0 && oddsData.map((game, index) => {
            if (!game || !game.odds || !game.odds[0]) return null;

            const homeMoneyline = getMoneylineForTeam(game.odds, game.home_team);
            const awayMoneyline = getMoneylineForTeam(game.odds, game.away_team);

            const matchingSpreads = getSpreadOrTotalGoalsForTeam(game.odds, game.home_team, game.away_team, game.sport);

            const homeTotal = getTotalForTeam(game?.odds, 'under');
            const awayTotal = getTotalForTeam(game?.odds, 'over');

            const totalRounds = getTotalRounds(game.odds)

            // Check if the game's sport is MMA, and conditionally render the Link or a div
          const isMMA = game.sport === 'mma';
          const WrapperComponent = isMMA ? 'div' : Link;
          const wrapperProps = isMMA ? {} : { to: `/sports/propBets/${game.id}` };

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
                <WrapperComponent key={index} {...wrapperProps} className="grid grid-cols-10 bg-white items-center py-3">
                  {/* Date/Time */}
                  <div className="col-span-2 text-center">
                    <span className="flex justify-center items-center text-zinc-500 text-sm font-normal">
                      {
                        new Date(game.start_date).toDateString() !== new Date().toDateString() ?
                          new Date(game.start_date).toLocaleDateString() :
                          new Date(game.start_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      }
                    </span>
                  </div>

                  {/* Team Name */}
                  <div className="col-span-3 lg:col-span-2 flex flex-col items-start h-14 justify-between">
                    <span className="text-indigo-950 text-sm lg:text-base font-medium">{game.away_team}</span>
                    <span className="text-indigo-950 text-sm lg:text-base font-medium">{game.home_team}</span>
                  </div>

                  {/* Moneyline */}
                  <div className="col-span-1 lg:col-span-2 lg:ml-6">
                    <div className="flex justify-center items-center space-x-3 mb-3">
                      <span className="text-zinc-500 text-sm lg:text-base font-normal">{awayMoneyline?.price}</span>
                    </div>
                    <div className="flex justify-center items-center space-x-3">
                      <span className="text-zinc-500 text-sm lg:text-base font-normal">{homeMoneyline?.price}</span>
                    </div>
                  </div>

                  {/* Spread */}
                  <div className="col-span-2 lg:ml-6">
                    <div className="flex justify-around items-center space-x-3 mb-3">
                      <span className="text-zinc-500 text-sm lg:text-base font-normal">{matchingSpreads?.awayOdds?.selection_points}</span>
                      <span className="text-zinc-400 text-sm lg:text-base font-normal">{matchingSpreads?.awayOdds?.price}</span>
                    </div>
                    <div className="flex justify-around items-center space-x-3">
                      <span className="text-zinc-500 text-sm lg:text-base font-normal">{matchingSpreads?.homeOdds?.selection_points}</span>
                      <span className="text-zinc-400 text-sm lg:text-base font-normal">{matchingSpreads?.homeOdds?.price}</span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="col-span-2 lg:ml-6">
                    <div className="flex justify-around items-center space-x-3 mb-3">
                      <span className="text-zinc-500 text-sm lg:text-base font-normal">{awayTotal ? `O  ${awayTotal?.selection_points}` : null}</span>
                      <span className="text-zinc-400 text-sm lg:text-base font-normal">{awayTotal?.price}</span>
                    </div>
                    <div className="flex justify-around items-center space-x-3">
                      <span className="text-zinc-500 text-sm lg:text-base font-normal">{homeTotal ? `U  ${homeTotal?.selection_points}` : null}</span>
                      <span className="text-zinc-400 text-sm lg:text-base font-normal">{homeTotal?.price}</span>
                    </div>
                  </div>
                </WrapperComponent>
              </div>
            )
          })
        }
      </div>
    ) : (
      <div className="content h-full w-full flex items-center justify-center bg-white animate-bg">
        <Loading />
      </div>
    ))
}