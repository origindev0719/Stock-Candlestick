import { Link } from "react-router-dom";
import { calculateStat, formatPlayerStats } from "../../../utils/sportStats/playerStats";
import { useEffect, useRef, useState } from "react";
import { Loading } from "../../../components/LoadingComponent";
import _ from 'lodash';
import { findOppositeCorrespondingOdds } from "../../../utils/sportStats/oddsFunctions";

export const PropBetsTable = ({ data, playersData, setTeamSelection }) => {
  const [formattedStats, setFormattedStats] = useState([]);
  const [processedPlayers, setProcessedPlayers] = useState([]);
  const [isOn, setIsOn] = useState(true);

  useEffect(() => {
    if (playersData.length > 0 && playersData[0]?.playerDetails[0] && data?.gameOdds?.odds) {
      const newFormattedStats = formatPlayerStats(playersData[0]?.playerDetails[0]);
      setFormattedStats(newFormattedStats);

      const newProcessedPlayers = playersData.map(player => {
        // Group the odds by player ID
        const playerOdds = _.groupBy(data.gameOdds.odds, 'player_id')

        // Find odds for the current player
        const oddsForPlayer = playerOdds[player?.playerDetails[0]?.id] || [];

        return {
          ...player,
          playerOdds: oddsForPlayer
        };
      });

      setProcessedPlayers(newProcessedPlayers);
    } else {
      // Reset state when no player data is available
      setFormattedStats([]);
      setProcessedPlayers([]);
    }
  }, [playersData, data.gameOdds?.odds, data.gameScore.sport]);

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

  const [selectedStat, setSelectedStat] = useState(statMap[0]?.gameStat);
  const [selectedButton, setSelectedButton] = useState(statMap[0]?.display);
  const [statMapValue, setStatMapValue] = useState(statMap[0]?.value);

  const initialSetRef = useRef(false);

  useEffect(() => {
    if (!initialSetRef.current && statMap.length > 0) {
      setSelectedStat(statMap[0]?.gameStat);
      setSelectedButton(statMap[0]?.display);
      setStatMapValue(statMap[0]?.value);
      initialSetRef.current = true; // Mark as set
    }
  }, [statMap]);

  const handleButtonClick = (statKey) => {
    const statObj = statMap.find(stat => stat.key === statKey);
    setSelectedStat(statObj?.gameStat);
    setSelectedButton(statObj?.display);
    setStatMapValue(statObj?.value);
  };

  return formattedStats.length && processedPlayers.length ? (
    <div className="flex flex-col w-full">
      <div className="flex flex-col h-24 w-full justify-between">
        {/* Stats Buttons Container */}
        <div className="PlayerStats h-2/5 flex flex-row items-center justify-between overflow-x-auto whitespace-nowrap">
          {formattedStats.map((stat, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(stat.stat)}
              className={`h-9 p-3 mr-2 rounded-full flex items-center justify-center ${selectedButton === stat.stat ? 'bg-primary text-black font-bold' : 'text-slate-500'}`}
            >
              {stat.stat}
            </button>
          ))}
        </div>
        <div className="h-1/3 w-1/2 flex flex-row items-center justify-between">
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
      <div className="flex items-start gap-3 w-1/3 my-8">
        <span className="text-slate-500 text-base font-normal leading-normal">Away Team</span>
        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              id="toggleB"
              className="sr-only"
              checked={isOn}
              onChange={() => {
                setIsOn(!isOn);
                setTeamSelection(isOn ? 'away' : 'home'); // Toggle team selection
              }}
            />
            <div className="block bg-neutral-900 w-14 h-6 rounded-full"></div>
            <div className={`dot absolute left-1 top-1 bg-primary w-4 h-4 rounded-full duration-300 ease-in-out ${isOn ? 'transform translate-x-8' : ''}`}></div>
          </div>
        </label>
        <span className="text-slate-500 text-base font-normal leading-normal">Home team</span>
      </div>
      {/* TABLE */}
      <div className="flex flex-col w-full">
        {processedPlayers ? processedPlayers.map((player, index) => {

          const mainOdd = player.playerOdds.find(odd => odd.market === statMapValue && odd.is_main);

          let line, under, over;

          if (mainOdd) {
            line = mainOdd?.selection_points;
            if (mainOdd?.selection_line) {
              const oddsResult = findOppositeCorrespondingOdds(player.playerOdds, mainOdd);
              under = oddsResult.under;
              over = oddsResult.over;
            }
          }

          const StatCalculated = {
            '2023': calculateStat(player?.playerResultsWithScores, selectedStat, selectedButton, '2023', line),
            'L10': calculateStat(player?.playerResultsWithScores, selectedStat, selectedButton, 'L10', line),
            'L5': calculateStat(player?.playerResultsWithScores, selectedStat, selectedButton, 'L5', line),
            'vs': calculateStat(player?.playerResultsWithScores, selectedStat, selectedButton, 'vs', line),
            'L20': calculateStat(player?.playerResultsWithScores, selectedStat, selectedButton, 'L20', line),
            'All': calculateStat(player?.playerResultsWithScores, selectedStat, selectedButton, 'All', line)
          };

          const bgColor = (percentageString) => {
            // Parse the percentage string to a number
            const percentageValue = parseFloat(percentageString);

            // Determine the background color based on the percentage
            const bg = percentageValue >= 50 ? 'bg-green' : 'bg-red';
            return bg;
          }


          return (
            <div className="flex flex-col h-24 w-full" key={index}>
              {/* TABLE HEADER */}
              <div className="flex flex-row justify-between h-1/2 w-1/2">
                <div className="flex-col justify-start items-start inline-flex">
                  <Link to={`/sports/playerInfo/${player.playerDetails[0].id}`}>
                    <button className="text-slate-500 text-base font-normal leading-normal">{player.playerDetails[0]?.player_name}</button>
                  </Link>
                  <div className="w-12 flex flex-row justify-between gap-1">
                    <span className="text-slate-500 text-xs font-medium leading-none">
                      {player.teamDetails[0]?.team_abbreviation}
                    </span>
                    <span className="text-slate-500 text-xs font-medium leading-none">
                      |
                    </span>
                    <span className="text-slate-500 text-xs font-medium leading-none">
                      {player.playerDetails[0]?.position}
                    </span>
                  </div>
                </div>
                {line ? (
                  <div className="w-52 h-10 justify-around items-start inline-flex">
                    <div className="flex flex-col items-center">
                      <span className="text-slate-500 text-base font-bold leading-normal">{line}</span>
                    </div>
                    <div className="justify-between gap-5 items-start inline-flex">
                      <div className="flex flex-col items-center">
                        <span className="text-slate-500 text-base font-normal leading-normal">{over}</span>
                        <span className="text-green text-xs font-medium leading-none">O</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-slate-500 text-base font-normal leading-normal">{under}</span>
                        <span className="text-red text-xs font-medium leading-none">U</span>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              {/* TABLE DATA */}
              <div className="w-full h-1/2 flex justify-start items-start gap-2.5">
                <div className={`h-10 flex-grow flex items-center justify-center ${bgColor(StatCalculated['2023'])} rounded-lg`}>
                  <span className="text-white text-sm sm:text-base font-medium">2023: {StatCalculated['2023']}</span>
                </div>
                <div className={`h-10 flex-grow flex items-center justify-center ${bgColor(StatCalculated['L10'])} rounded-lg`}>
                  <span className="text-white text-sm sm:text-base font-medium">L10: {StatCalculated['L10']}</span>
                </div>
                <div className={`h-10 flex-grow flex items-center justify-center ${bgColor(StatCalculated['L5'])} rounded-lg`}>
                  <span className="text-white text-sm sm:text-base font-medium">L5: {StatCalculated['L5']}</span>
                </div>
                <div className={`h-10 flex-grow flex items-center justify-center ${bgColor(StatCalculated['vs'])} rounded-lg`}>
                  <span className="text-white text-sm sm:text-base font-medium">vs {isOn ? data?.away_team_info.team_abbreviation : data?.home_team_info.team_abbreviation}</span>
                </div>
                <div className={`h-10 flex-grow flex items-center justify-center ${bgColor(StatCalculated['L20'])} rounded-lg`}>
                  <span className="text-white text-sm sm:text-base font-medium">L20: {StatCalculated['L20']}</span>
                </div>
                <div className={`h-10 flex-grow flex items-center justify-center ${bgColor(StatCalculated['2023'])} rounded-lg`}>
                  <span className="text-white text-sm sm:text-base font-medium">2022: 86</span>
                </div>
              </div>
            </div>
          )
        }) : (
          <div className="flex flex-col w-full h-screen items-center justify-center animate-bg">
            <Loading />
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="flex flex-col w-full h-screen items-center justify-center animate-bg">
      <Loading />
    </div>
  )
}