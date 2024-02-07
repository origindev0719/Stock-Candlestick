import { Loading } from "../../components/LoadingComponent";
import { Navbar } from "../../components/Navbar"
import { Sidebar } from "../../components/Sidebar"
import { PropBetsTable } from "./components/PropBetsTable";

export const PropBetsLiveView = ({ data, playersData }) => {
  const game = data?.gameScore;
  const homeTeam = data.home_team_info;
  const awayTeam = data.away_team_info;

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
      <div className="flex flex-col w-full h-screen overflow-y-auto overflow-x-hidden">
        <div className="sticky top-0 z-10 bg-white">
          <Navbar title='Sports' />
        </div>
        <div className="mt-10 ml-10 flex flex-row h-full w-full">
          <div className="flex flex-col w-1/4">
            <div className="w-full h-32 flex flex-col items-center justify-center bg-white p-4 mb-5">
              <span className="text-neutral-500 text-xs font-normal mb-2">{game.season_year} {game.league} {game.season_type}</span>
              <div className="flex flex-row w-full justify-between items-center">
                <div className="flex flex-col items-center">
                  <img className="w-8 h-7 mb-1" src={homeTeam.logo} alt={homeTeam.team_name} />
                  <span className="text-black text-xs font-semibold leading-tight mb-1">{homeTeam.team_abbreviation}</span>
                  <span className="text-neutral-500 text-xs font-normal leading-tight">73-9</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="text-black text-xs font-medium leading-tight mb-2">{gameDate}<br />{gameTime}</span>
                </div>
                <div className="flex flex-col items-center">
                  <img className="w-8 h-7 mb-1" src={awayTeam.logo} alt={awayTeam.team_name} />
                  <span className="text-black text-xs font-semibold leading-tight mb-1">{awayTeam.team_abbreviation}</span>
                  <span className="text-neutral-500 text-xs font-normal leading-tight">48-39</span>
                </div>
              </div>
            </div>

            <div className="w-full h-44 bg-white flex flex-col">
              <span className="h-10 px-6 bg-neutral-900 rounded-t-lg flex items-center text-white text-sm font-semibold uppercase">
                {gameDate2}
              </span>
              <div className="w-full h-28 flex flex-col pt-4">
                <div className="w-full h-20 flex flex-row items-center">
                  <div className="w-1/6 h-20 flex flex-col items-center justify-center text-justify text-zinc-500 text-sm font-normal">
                    <span>{gameTime}</span>
                  </div>
                  <div className="w-5/6 h-20 flex flex-col justify-between items-end pr-2">
                    <div className="flex flex-row items-center w-full">
                      <span className="text-indigo-950 text-base mr-7 font-medium">{homeTeam.team_abbreviation}</span>
                      <div className="flex flex-row items-center gap-10">
                        <div className="flex items-center gap-3">
                          <span className="text-zinc-500 text-base font-normal">+10</span>
                          <span className="text-zinc-400 text-base font-normal">-115</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-zinc-500 text-base font-normal">+10</span>
                          <span className="text-zinc-400 text-base font-normal font-['Noto Sans']">-123</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-px bg-slate-200 rounded-lg"></div>
                    <div className="flex flex-row items-center w-full">
                      <span className="text-indigo-950 text-base mr-7 font-medium">{awayTeam.team_abbreviation}</span>
                      <div className="flex flex-row items-center gap-10">
                        <div className="flex items-center gap-3">
                          <span className="text-zinc-500 text-base font-normal">+10</span>
                          <span className="text-zinc-400 text-base font-normal">-115</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-zinc-500 text-base font-normal">+10</span>
                          <span className="text-zinc-400 text-base font-normal font-['Noto Sans']">-123</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-px bg-slate-200 rounded-lg"></div>
                  </div>
                </div>
                <div className="w-full h-10 flex items-center justify-between bg-neutral-50">
                  <span className="text-neutral-900 text-sm font-normal capitalize px-4">matchup</span>
                  <span className="text-neutral-900 text-sm font-normal capitalize px-4">Line history</span>
                </div>
              </div>
            </div>
          </div>
          <div className="ml-10 w-2/3">
            <PropBetsTable data={data} playersData={playersData} />
          </div>
        </div>
      </div>
      ) : (
        <div className="content h-screen w-screen flex items-center justify-center bg-white animate-bg">
          <Loading />
        </div>
      )}
    </div>
  )
}