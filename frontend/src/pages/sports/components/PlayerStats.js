import { Link } from "react-router-dom";
import { PlayerInfoCharts } from "./PlayerInfoCharts"
import { useEffect, useRef, useState } from "react";
import { formatPlayerStats } from "../../../utils/sportStats/playerStats";

export const PlayerStats = ({ player }) => {
  // Helper function to format the date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const day = days[date.getUTCDay()];
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const formattedTime = hours % 12 + ':' + (minutes < 10 ? '0' : '') + minutes + (hours >= 12 ? ' pm' : ' am');
  return `${day} ${formattedTime}`;
};

const [formattedStats, setFormattedStats] = useState([]);

  useEffect(() => {
    if (player.playerDetails[0]) {
      setFormattedStats(formatPlayerStats(player.playerDetails[0]));
    }
  }, [player]);

  const generateStatMap = (stats) => {
    let mapArray = [];
    stats.forEach(stat => {
      mapArray.push({
        key: stat?.stat,
        value: stat?.value,
        display: stat?.stat,
        gameStat: stat?.gameStat
      });
    });
    return mapArray;
  };


  const statMap = generateStatMap(formattedStats);

  const [selectedStat, setSelectedStat] = useState(statMap[0]?.value);
  const [selectedButton, setSelectedButton] = useState(statMap[0]?.display);

  const initialSetRef = useRef(false);

    if (!initialSetRef.current && statMap.length > 0) {
      setSelectedStat(statMap[0]?.value);
      setSelectedButton(statMap[0]?.display);
      initialSetRef.current = true; // Mark as set
    }

  const handleButtonClick = (statKey) => {
    const statObj = statMap.find(stat => stat.gameStat === statKey);
    setSelectedStat(statObj?.value);
    setSelectedButton(statObj?.key);
  };


  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col h-40 w-full justify-between">
        {/* Stats Buttons Container */}
        <div className="PlayerStats h-2/5 flex flex-row items-center justify-between overflow-x-auto whitespace-nowrap">
          {formattedStats.map((stat, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(stat.gameStat)}
              className={`h-9 p-3 mr-2 rounded-full flex items-center justify-center ${selectedButton === stat.stat ? 'bg-primary text-black font-bold' : 'text-slate-500'}`}
            >
              {stat.stat}
            </button>
          ))}
        </div>

        <div className="h-1/3 flex flex-row items-center justify-between overflow-x-auto whitespace-nowrap">
          <button className="h-9 p-1.5 bg-primary rounded-full flex items-center justify-center flex-grow">
            <div className="text-black text-base font-bold leading-normal mx-3.5">All</div>
          </button>

          {
            player.playerResultsWithScores.slice(0, 7).map((game, index) => (
              <Link to={`/sports/propBets/${game.game_id}`} className="p-1.5 rounded-full flex flex-col items-center justify-center flex-grow" key={index} >
                <span className="text-slate-500 text-base font-normal leading-normal">
                  {game?.gameScore?.home_team_abb} v {game?.gameScore?.away_team_abb}
                </span>
                <span className="text-slate-500 text-xs font-medium leading-none">
                  {formatDate(game?.gameScore?.start_date)}
                </span>
              </Link>
            ))
          }
        </div>

        <div className="h-1/3 w-full flex flex-row items-center justify-between">
          <button className="h-9 p-1.5 bg-primary rounded-full flex items-center justify-center flex-grow">
            <span className="text-black text-base font-bold leading-normal mx-3">Under</span>
          </button>

          <div className="p-1.5 rounded-full flex items-center justify-center flex-grow">
            <span className="text-slate-500 text-base font-normal leading-normal">|</span>
          </div>

          <button className="p-1.5 rounded-full flex items-center justify-center flex-grow">
            <span className="text-slate-500 text-base font-normal leading-normal">All</span>
          </button>

          <button className="p-1.5 rounded-full flex items-center justify-center flex-grow">
            <span className="text-slate-500 text-base font-normal leading-normal">Last 10</span>
          </button>

          <button className="p-1.5 rounded-full flex items-center justify-center flex-grow">
            <span className="text-slate-500 text-base font-normal leading-normal">Last 5</span>
          </button>

          <button className="p-1.5 rounded-full flex items-center justify-center flex-grow">
            <span className="text-slate-500 text-base font-normal leading-normal">vs. Opp</span>
          </button>

          <button className="p-1.5 rounded-full flex items-center justify-center flex-grow">
            <span className="text-slate-500 text-base font-normal leading-normal">Last 20</span>
          </button>

          <button className="p-1.5 rounded-full flex items-center justify-center flex-grow">
            <span className="text-slate-500 text-base font-normal leading-normal">2022</span>
          </button>
        </div>
      </div>
      <PlayerInfoCharts player={player} statMap={statMap} selectedStat={selectedStat} />
    </div>
  )
}