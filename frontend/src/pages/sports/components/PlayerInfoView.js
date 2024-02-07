import { Link, Navigate, useParams } from "react-router-dom";
import { Navbar } from "../../../components/Navbar"
import { Sidebar } from "../../../components/Sidebar"
import { useEffect, useMemo, useState } from "react";
//import { PlayerGames } from "./PlayerGames";
import { PlayerStats } from "./PlayerStats";
import { useDispatch, useSelector } from "react-redux";
import { getPlayer } from "../../../redux/actions/SportsActions";
import { Loading } from "../../../components/LoadingComponent";
import { calculatePlayerStat, formatPlayerAbbStats, getAwayStats, getLastGameStats, getTopStatsForPosition } from "../../../utils/sportStats/playerStats";

export const PlayerInfoView = () => {
  const { id: playerId } = useParams();
  const [selectedButton, setSelectedButton] = useState('Overview');
  const [seasonStats, setSeasonStats] = useState([]);

  const dispatch = useDispatch()

  useEffect(() => {
    if (playerId) {
      dispatch(getPlayer(playerId, false))
    }
  }, [dispatch, playerId]);

  const getPlayerState = useSelector(state => state.getPlayer);
  const { player } = getPlayerState;

  const [formattedStats, setFormattedStats] = useState([]);

  useEffect(() => {
    if (player?.playerDetails[0]) {
      setFormattedStats(formatPlayerAbbStats(player?.playerDetails[0]));
    }
  }, [player]);

  const generateStatMap = (stats) => {
    let mapArray = [];
    stats.forEach(stat => {
      mapArray.push({
        stat: stat?.stat,
        display: stat?.display,
      });
    });
    return mapArray;
  };


  const statMap = generateStatMap(formattedStats);

  const lastGameStats = (player && statMap) ? getLastGameStats(player, statMap) : null;
  const awayStats = (player && statMap) ? getAwayStats(player, statMap) : null;

  const calculateSeasonStats = (playerResultsWithScores, statMap) => {
    // Create an object to hold the total for each stat
    let seasonTotals = {};
  
    // Initialize each stat in seasonTotals to 0
    statMap.forEach(stat => {
      seasonTotals[stat.stat] = 0;
    });
  
    // Sum up the stats for each game
    playerResultsWithScores.forEach(game => {
      statMap.forEach(stat => {
        seasonTotals[stat.stat] += game[stat.stat] || 0;
      });
    });
  
    // Map the totals to the statMap's display order
    let seasonStats = statMap.map(stat => seasonTotals[stat.stat]);
    return seasonStats;
  };
  
  useEffect(() => {
    // Assuming playerResultsWithScores is an array of game stat objects
    if (player && player.playerResultsWithScores) {
      let seasonStatsCalculated = calculateSeasonStats(player.playerResultsWithScores, statMap);
      setSeasonStats(seasonStatsCalculated);
    }
  }, [player]);
  

  const token = window.localStorage.getItem("userInfo");

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-full h-screen bg-neutral-50 flex flex-row overflow-y-hidden">
      <Sidebar />
      {player ? (
        <div className="flex flex-col w-full h-full overflow-x-hidden overflow-y-hidden">
          <div className="sticky top-0 z-10 bg-white">
            <Navbar title='Sports' />
          </div>
          <div className="mt-10 ml-10 flex flex-col lg:flex-row justify-center h-full w-full">
            <div className="PlayersInfo w-full lg:w-1/4">
              <div className="flex flex-row lg:flex-col w-11/12 lg:sticky top-0">
                <section className="flex flex-col md:flex-row justify-around w-full border-b border-slate-500">
                  <div className="relative w-full md:w-2/5 rounded-lg mt-4 md:mt-0 overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-right opacity-30 z-0" style={{ backgroundImage: `url(${player.teamDetails[0].logo})` }}></div>
                    <img className="w-3/4 md:w-full h-1/2 md:h-2/3 object-cover rounded-lg absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10" src={player.playerDetails[0].logo ? player.playerDetails[0].logo : 'https://fredfloridalaw.com/wp-content/uploads/2021/12/PngItem_307416.png'} alt="Player Logo" />
                  </div>

                  <div className="flex flex-col items-start pl-4 w-full md:w-3/5 mt-4 md:mt-0">
                    <div className="text-black text-xl font-light">{player.playerDetails[0].first_name}</div>
                    <div className="text-black text-xl font-semibold">{player.playerDetails[0].last_name}</div>
                    <div className="flex flex-col mt-2">
                      <Link to={`/sports/team/${player.playerDetails[0].team_id}`}>
                        <div className="flex items-center py-3">
                          <img className="w-5 h-5" src={player.teamDetails[0].logo} alt="" />
                          <span className="text-black text-sm pl-2">
                            {player.playerDetails[0].team_name} &nbsp;
                            #{player.playerDetails[0].number} &nbsp;
                            {player.playerDetails[0].position}
                          </span>
                        </div>
                      </Link>
                      <div className="flex justify-between w-full p-1">
                        <span className="text-neutral-500 text-sm">POS</span>
                        <span className="text-neutral-900 text-sm font-semibold">
                          {player.playerDetails[0].position}
                        </span>
                      </div>
                      <div className="flex justify-between w-full p-1">
                        <span className="text-neutral-500 text-sm">HT/WT</span>
                        <span className="text-neutral-900 text-sm font-semibold">
                          {Math.floor(player.playerDetails[0].height / 12)}’ {player.playerDetails[0].height % 12}”, &nbsp;
                          {player.playerDetails[0].weight} lbs
                        </span>
                      </div>
                      <button className="w-28 h-8 my-3 flex items-center justify-center border border-blue-600 rounded-3xl">
                        <span className="text-blue-600 text-xs font-semibold">FOLLOW</span>
                      </button>
                    </div>
                  </div>
                </section>

                <section className="flex flex-col">
                  <div className="m-5 border border-slate-500 rounded-xl">
                    <div className="flex flex-row justify-around bg-neutral-900 text-white text-xs font-semibold rounded-t-xl py-1">
                      <span>2022-23 SEASON STATS</span>
                    </div>
                    <div className="flex flex-wrap justify-around py-1">
                      <div className="text-center w-full sm:w-1/2 md:w-1/4">
                        <span className="text-neutral-500 text-sm whitespace-nowrap">{statMap[0]?.display}</span>
                        <div className="text-neutral-900 text-base font-semibold">{seasonStats[0]}</div>
                      </div>
                      <div className="text-center w-full sm:w-1/2 md:w-1/4">
                        <span className="text-neutral-500 text-sm whitespace-nowrap">{statMap[1]?.display}</span>
                        <div className="text-neutral-900 text-base font-semibold">{seasonStats[1]}</div>
                      </div>
                      <div className="text-center w-full sm:w-1/2 md:w-1/4">
                        <span className="text-neutral-500 text-sm whitespace-nowrap">{statMap[2]?.display}</span>
                        <div className="text-neutral-900 text-base font-semibold">{seasonStats[2]}</div>
                      </div>
                      <div className="text-center w-full sm:w-1/2 md:w-1/4">
                        <span className="text-neutral-500 text-sm whitespace-nowrap">{statMap[3]?.display}</span>
                        <div className="text-neutral-900 text-base font-semibold">{seasonStats[3]}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-row w-full overflow-x-auto whitespace-nowrap">
                      <button
                        onClick={() => setSelectedButton('Overview')}
                        className={`flex-grow p-2 text-center text-neutral-900 text-base font-normal font-['SF Pro Text'] leading-snug ${selectedButton === 'Overview' ? 'border-b-4 border-red rounded-[2px]' : ''}`}
                      >
                        Overview
                      </button>
                      <button
                        onClick={() => setSelectedButton('News')}
                        className={`flex-grow p-2 text-center text-neutral-900 text-base font-normal font-['SF Pro Text'] leading-snug ${selectedButton === 'News' ? 'border-b-4 border-red' : ''}`}
                      >
                        News
                      </button>
                      <button
                        onClick={() => setSelectedButton('Stats')}
                        className={`flex-grow p-2 text-center text-neutral-900 text-base font-normal font-['SF Pro Text'] leading-snug ${selectedButton === 'Stats' ? 'border-b-4 border-red' : ''}`}
                      >
                        Stats
                      </button>
                      <button
                        onClick={() => setSelectedButton('Bio')}
                        className={`flex-grow p-2 text-center text-neutral-900 text-base font-normal font-['SF Pro Text'] leading-snug ${selectedButton === 'Bio' ? 'border-b-4 border-red' : ''}`}
                      >
                        Bio
                      </button>
                      <button
                        onClick={() => setSelectedButton('Splits')}
                        className={`flex-grow p-2 text-center text-neutral-900 text-base font-normal font-['SF Pro Text'] leading-snug ${selectedButton === 'Splits' ? 'border-b-4 border-red' : ''}`}
                      >
                        Splits
                      </button>
                      <button
                        onClick={() => setSelectedButton('Game Log')}
                        className={`flex-grow p-2 text-center text-neutral-900 text-base font-normal font-['SF Pro Text'] leading-snug ${selectedButton === 'Game Log' ? 'border-b-4 border-red' : ''}`}
                      >
                        Game Log
                      </button>
                    </div>
                    <div className="SplitsTable w-full h-full overflow-x-auto">
                      <div className="flex">
                        <table className="min-w-full text-neutral-500 font-['SF Pro Text']">
                          <thead>
                            <tr className="text-xs font-medium leading-tight">
                              <th className="p-1.5 text-left">SPLITS</th>
                              {
                                lastGameStats?.map((item, index) => (
                                  <th key={index} className="p-1.5">{item?.display}</th>
                                ))
                              }
                            </tr>
                          </thead>
                          <tbody className="text-sm font-normal leading-tight">
                            <tr className="border-b border-slate-500">
                              <td className="p-1.5 text-left whitespace-nowrap">This Game</td>
                              {
                                lastGameStats?.map((item, index) => (
                                  <th key={index} className="text-sm font-normal p-1.5 text-center">{item.value}</th>
                                ))
                              }
                            </tr>
                            <tr className="border-b border-slate-500">
                              <td className="p-1.5 text-left">VS Bryant</td>
                              <th className="text-sm font-normal p-1.5 text-center">2</th>
                              <th className="text-sm font-normal p-1.5 text-center">31.0</th>
                              <th className="text-sm font-normal p-1.5 text-center">42.9</th>
                              <th className="text-sm font-normal p-1.5 text-center">0.0</th>
                              <th className="text-sm font-normal p-1.5 text-center">36.4</th>
                              <th className="text-sm font-normal p-1.5 text-center">6.5</th>
                              <th className="text-sm font-normal p-1.5 text-center">1.9</th>
                              <th className="text-sm font-normal p-1.5 text-center">1.0</th>
                              <th className="text-sm font-normal p-1.5 text-center">1.5</th>
                            </tr>
                            <tr className="border-b border-slate-500">
                              <td className="p-1.5 text-left">Away</td>
                              {
                                awayStats?.map((item, index) => (
                                  <th key={index} className="text-sm font-normal p-1.5 text-center">{item.value}</th>
                                ))
                              }
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
            <div className="PlayersStats ml-10 mb-32 w-11/12 lg:w-2/4 overflow-y-auto">
              <PlayerStats player={player} />
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