import React, { useEffect, useState } from 'react';
import { PlayerStatsCharts } from '../../../components/PlayerStatsCharts';
//import { ThreePointsChart } from '../../../components/ThreePointsChart';
//import { FieldGoalsChart } from '../../../components/FieldGoalsChart';
import { calculatePlayerStat, findNewestOdds, getTopStatsForPosition } from '../../../utils/sportStats/playerStats';

export const PlayerInfoCharts = ({ player, statMap, selectedStat }) => {
  const [selectedOdd, setSelectedOdd] = useState()
  const [line, setLine] = useState()

  // State for selected button and corresponding data
  const [selectedButton, setSelectedButton] = useState('2023');

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  useEffect(() => {
    if (player?.playerOdds?.odds && player?.playerOdds?.league && selectedStat) {
      const newSelectedOdd = findNewestOdds(selectedStat, player?.playerOdds?.odds, player?.playerOdds?.sport);
      setSelectedOdd(newSelectedOdd);
      if (newSelectedOdd) {
        setLine(newSelectedOdd[0]?.bet_points);
      }
    }
  }, [player, selectedStat]);

  const playerStatsByPosition = getTopStatsForPosition(
    player?.playerDetails[0]?.sport,
    player?.playerDetails[0]?.position,
    player
  )

  const chartTwo = {
    '2023': calculatePlayerStat(player, '2023', playerStatsByPosition[1]),
    'L10': calculatePlayerStat(player, 'L10', playerStatsByPosition[1]),
    'L5': calculatePlayerStat(player, 'L5', playerStatsByPosition[1]),
    'vs': calculatePlayerStat(player, 'vs', playerStatsByPosition[1]),
    'L20': calculatePlayerStat(player, 'L20', playerStatsByPosition[1]),
    'All': calculatePlayerStat(player, 'All', playerStatsByPosition[1])
  };
  const chartThree = {
    '2023': calculatePlayerStat(player, '2023', playerStatsByPosition[2]),
    'L10': calculatePlayerStat(player, 'L10', playerStatsByPosition[2]),
    'L5': calculatePlayerStat(player, 'L5', playerStatsByPosition[2]),
    'vs': calculatePlayerStat(player, 'vs', playerStatsByPosition[2]),
    'L20': calculatePlayerStat(player, 'L20', playerStatsByPosition[2]),
    'All': calculatePlayerStat(player, 'All', playerStatsByPosition[2])
  };

  const titleChartOne = statMap.find(stat => stat.value === selectedStat);
  const titleChartTwo = statMap.find(stat => stat.value === playerStatsByPosition[1]);
  const titleChartThree = statMap.find(stat => stat.value === playerStatsByPosition[2]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex-col p-6">
        <div className="PlayerInfo w-full h-16 flex items-center mb-4">
          <div className="w-6/12 flex-col">
            <span className="block text-xl leading-loose">
              {player.playerDetails[0].player_name} &nbsp;
              ({player.teamDetails[0].team_abbreviation})
            </span>
            <span className="block text-base leading-loose">
              {selectedOdd ? selectedOdd[0].bet_points : null} {titleChartOne?.display}
            </span>
          </div>
          {
            selectedOdd && selectedOdd.length > 0 && (
              <div className="w-5/12 flex justify-around items-end">
                {selectedOdd.map((odd, index) => (
                  <div key={index} className="flex flex-col items-center">
                    {odd.selection_line === 'over' && (
                      <>
                        <span className="text-xl leading-loose">{odd.price > 0 ? `+${odd.price}` : odd.price}</span>
                        <span className="text-green text-xl">O</span>
                      </>
                    )}
                    {odd.selection_line === 'under' && (
                      <>
                        <span className="text-xl leading-loose">{odd.price > 0 ? `+${odd.price}` : odd.price}</span>
                        <span className="text-red text-xl">U</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )
          }
          <div className="w-1/12"></div>
        </div>
        <div className='w-full bg-white drop-shadow-sm'>
          <PlayerStatsCharts key={line} data={player} selectedButton={selectedButton} titleChartOne={titleChartOne} line={line} />
        </div>
        <div className='flex flex-col w-full h-32 justify-center items-center gap-4 mt-10'>
          <div className='flex h-1/3 w-3/5 justify-start items-center gap-5'>
            <div className="flex-grow justify-center items-center gap-3.5 flex">
              <span className="text-zinc-500 text-base font-bold leading-normal">Split</span>
            </div>
            <button
              className={`flex-grow justify-center items-center gap-3.5 flex ${selectedButton === '2023' ? 'bg-primary rounded-full' : ''}`}
              onClick={() => handleButtonClick('2023')}
            >
              <span className="text-slate-500 text-base font-normal leading-normal">2023</span>
            </button>
            <button
              className={`flex-grow justify-center items-center gap-3.5 flex ${selectedButton === 'L10' ? 'bg-primary rounded-full' : ''}`}
              onClick={() => handleButtonClick('L10')}
            >
              <span className="text-slate-500 text-base font-normal leading-normal">L10</span>
            </button>
            <button
              className={`flex-grow justify-center items-center gap-3.5 flex ${selectedButton === 'L5' ? 'bg-primary rounded-full' : ''}`}
              onClick={() => handleButtonClick('L5')}
            >
              <span className="text-slate-500 text-base font-normal leading-normal">L5</span>
            </button>
            <button
              className={`flex-grow justify-center items-center gap-3.5 flex ${selectedButton === 'vs' ? 'bg-primary rounded-full' : ''}`}
              onClick={() => handleButtonClick('vs')}
            >
              <span className="text-slate-500 text-base font-normal leading-normal">vs</span>
            </button>
            <button
              className={`flex-grow justify-center items-center gap-3.5 flex ${selectedButton === 'L20' ? 'bg-primary rounded-full' : ''}`}
              onClick={() => handleButtonClick('L20')}
            >
              <span className="text-slate-500 text-base font-normal leading-normal">L20</span>
            </button>
            <button
              className={`flex-grow justify-center items-center gap-3.5 flex ${selectedButton === 'All' ? 'bg-primary rounded-full' : ''}`}
              onClick={() => handleButtonClick('All')}
            >
              <span className="text-slate-500 text-base font-normal leading-normal">All</span>
            </button>
          </div>
          <div className='flex h-1/3 w-3/5 justify-start items-center gap-5'>
            <div className="flex-grow justify-center items-center gap-3.5 flex">
              <span className="text-zinc-500 text-base font-bold leading-normal">{titleChartTwo?.display}</span>
            </div>
            <div className="flex-grow justify-center items-center gap-3.5 flex">
              <span className="text-slate-500 text-base font-normal leading-normal">{chartTwo['2023']}</span>
            </div>
            <div className="flex-grow justify-center items-center gap-3.5 flex">
              <span className="text-slate-500 text-base font-normal leading-normal">{chartTwo['L10']}</span>
            </div>
            <div className="flex-grow justify-center items-center gap-3.5 flex">
              <span className="text-slate-500 text-base font-normal leading-normal">{chartTwo['L5']}</span>
            </div>
            <div className="flex-grow justify-center items-center gap-3.5 flex">
              <span className="text-slate-500 text-base font-normal leading-normal">{chartTwo['vs']}</span>
            </div>
            <div className="flex-grow justify-center items-center gap-3.5 flex">
              <span className="text-slate-500 text-base font-normal leading-normal">{chartTwo['L20']}</span>
            </div>
            <div className="flex-grow justify-center items-center gap-3.5 flex">
              <span className="text-slate-500 text-base font-normal leading-normal">{chartTwo['All']}</span>
            </div>
          </div>
          <div className='flex h-1/3 w-3/5 justify-start items-center gap-5'>
            <div className="flex-grow justify-center items-center gap-3.5 flex">
              <span className="text-zinc-500 text-base font-bold leading-normal">{titleChartThree?.display}</span>
            </div>
            <div className="flex-grow justify-center items-center gap-3.5 flex">
              <span className="text-slate-500 text-base font-normal leading-normal">{chartThree['2023']}</span>
            </div>
            <div className="flex-grow justify-center items-center gap-3.5 flex">
              <span className="text-slate-500 text-base font-normal leading-normal">{chartTwo['L10']}</span>
            </div>
            <div className="flex-grow justify-center items-center gap-3.5 flex">
              <span className="text-slate-500 text-base font-normal leading-normal">{chartThree['L5']}</span>
            </div>
            <div className="flex-grow justify-center items-center gap-3.5 flex">
              <span className="text-slate-500 text-base font-normal leading-normal">{chartThree['vs']}</span>
            </div>
            <div className="flex-grow justify-center items-center gap-3.5 flex">
              <span className="text-slate-500 text-base font-normal leading-normal">{chartThree['L20']}</span>
            </div>
            <div className="flex-grow justify-center items-center gap-3.5 flex">
              <span className="text-slate-500 text-base font-normal leading-normal">{chartThree['All']}</span>
            </div>
          </div>
        </div>
      </div>

     {/* <div className="flex-col p-6 bg-white mb-5 drop-shadow-lg">
        <div className="PlayerInfo w-full h-16 flex items-center mb-4">
          <div className="w-6/12 flex-col">
            <span className="block text-xl leading-loose">{titleChartTwo?.display}</span>
            <span className="block text-base leading-loose">{player.playerDetails[0].player_name}</span>
          </div>
          <div className="w-5/12 grid grid-cols-3 items-end">
            <span className="text-xl leading-loose">{chartTwo['2023']}</span>
            <span className="text-xl leading-loose">{chartTwo['L10']}</span>
            <span className="text-xl leading-loose">{chartTwo['L5']}</span>
            <span className="text-xl leading-loose">Full</span>
            <span className="text-xl leading-loose">L10</span>
            <span className="text-xl leading-loose">L5</span>
          </div>

          <div className="w-1/12"></div>
        </div>
        <div className='w-full bg-white drop-shadow-sm'>
          <ThreePointsChart data={player} chartTwo={chartTwo} titleChartTwo={titleChartTwo} />
        </div>
      </div>

      <div className="flex-col p-6 bg-white">
        <div className="PlayerInfo w-full h-16 flex items-center mb-4">
          <div className="w-6/12 flex-col">
            <span className="block text-xl leading-loose">{titleChartThree?.display}</span>
            <span className="block text-base leading-loose">{player.playerDetails[0].player_name}</span>
          </div>
          <div className="w-5/12 grid grid-cols-3 items-end">
            <span className="text-xl leading-loose">{chartThree['2023']}</span>
            <span className="text-xl leading-loose">{chartThree['L10']}</span>
            <span className="text-xl leading-loose">{chartThree['L5']}</span>
            <span className="text-xl leading-loose">Full</span>
            <span className="text-xl leading-loose">L10</span>
            <span className="text-xl leading-loose">L5</span>
          </div>

          <div className="w-1/12"></div>
        </div>
        <div className='w-full bg-white drop-shadow-sm'>
          <FieldGoalsChart data={player} titleChartThree={titleChartThree} />
        </div>
      </div>*/}
    </div>
  )
}