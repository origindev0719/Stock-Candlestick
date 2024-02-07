import React, { useEffect, useState } from 'react';
import { Navbar } from "../../components/Navbar"
import { Sidebar } from "../../components/Sidebar"
import { useDispatch, useSelector } from 'react-redux';
import { getGameOdds, getLeagues, getSchedule, getTeamPlayers, getTeams } from '../../redux/actions/SportsActions';
import _ from 'lodash';
import { Loading } from '../../components/LoadingComponent';
import { findOppositeCorrespondingOdds } from '../../utils/sportStats/oddsFunctions';
import { BottomBar } from '../../components/BottomBar';

export const EvChartView = () => {
  const dispatch = useDispatch();
  const dummySport = 'football'
  const dummyLeague = 'NFL';

  const [selectedLeague, setSelectedLeague] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedTeamName, setSelectedTeamName] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedPlayerName, setSelectedPlayerName] = useState(null);
  const [playerStatsData, setPlayerStatsData] = useState([]);

  const [upcomingGames, setUpcomingGames] = useState([]);
  const [teams, setTeams] = useState([]);
  const [marketStats, setMarketStats] = useState([]);
  const [currentMarketIndex, setCurrentMarketIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch leagues only once when the component mounts
  const leagues = useSelector(state => state.getLeagues.leagues);
  //const teams = useSelector(state => state.getTeams.teams);
  const playersData = useSelector(state => state.getTeamPlayers.players);
  const playerStats = useSelector(state => state.getPlayer.player);
  const currentGameOdds = useSelector(state => state.getGameOdds.odds);

  // Helper function to handle data fetching with loading state
  const fetchDataWithLoading = async (fetchFunction) => {
    setIsLoading(true);
    try {
      await fetchFunction();
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch leagues only once when the component mounts
  useEffect(() => {
    fetchDataWithLoading(async () => {
      await dispatch(getLeagues(dummySport));
    });
  }, [dispatch]);

  // Fetch Teams when League is selected
  useEffect(() => {
    if (selectedLeague) {
      fetchDataWithLoading(async () => {
        const teamsData = await dispatch(getTeams(dummySport, selectedLeague));
        setTeams(teamsData);
      });
    }
  }, [selectedLeague, dispatch]);

  // Fetch leagues and initial data
  useEffect(() => {
    fetchDataWithLoading(async () => {
      setIsLoading(true);
      const schedule = await dispatch(getSchedule(dummySport, dummyLeague));
      if (schedule && schedule.length > 0) {
        setUpcomingGames(schedule);
        const firstGame = schedule[0];

        const homeTeamPlayers = await dispatch(getTeamPlayers(dummySport, dummyLeague, firstGame.home_team_id));
        const awayTeamPlayers = await dispatch(getTeamPlayers(dummySport, dummyLeague, firstGame.away_team_id));

        // Combine home and away team players
        const combinedPlayers = [...homeTeamPlayers, ...awayTeamPlayers];

        const odds = await dispatch(getGameOdds(firstGame.game_id));
        if (odds && odds.length > 0) {
          const playerOdds = _.groupBy(odds[0].odds.filter(odd => odd.player_id), 'player_id');

          const playerDetails = Object.entries(playerOdds).map(([playerId, playerOddsArray]) => {
            // Find the player in the combined players list
            const player = combinedPlayers.find(p => p.id === playerId);

            let teamName = '';
            if (player) {
              teamName = player.team_name;
            } else {
              const homePlayer = homeTeamPlayers.some(p => p.id === playerId);
              teamName = homePlayer ? firstGame.home_team : firstGame.away_team;
            }

            return {
              playerId,
              playerName: player ? player.player_name : playerOddsArray[0].selection,
              playerOdds: playerOddsArray,
              teamName: teamName,
              league: firstGame.league
            };
          });
          setPlayerStatsData(playerDetails);
        }
        setIsLoading(false);
      }
      setIsLoading(false);
    }
    );
  }, [dispatch, dummySport, dummyLeague]);

  const fetchInitialDataForGame = async (game) => {
    const homeTeamPlayers = await dispatch(getTeamPlayers(dummySport, selectedLeague, game.home_team_id));
    const awayTeamPlayers = await dispatch(getTeamPlayers(dummySport, selectedLeague, game.away_team_id));
    const combinedPlayers = [...homeTeamPlayers, ...awayTeamPlayers];

    const odds = await dispatch(getGameOdds(game.game_id));
    if (odds && odds.length > 0) {
      const playerOdds = _.groupBy(odds[0].odds.filter(odd => odd.player_id), 'player_id');
      const playerDetails = Object.entries(playerOdds).map(([playerId, playerOddsArray]) => {
        const player = combinedPlayers.find(p => p.id === playerId);
        let teamName = player ? player.team_name : (homeTeamPlayers.some(p => p.id === playerId) ? game.home_team : game.away_team);
        return {
          playerId,
          playerName: player ? player.player_name : playerOddsArray[0].selection,
          playerOdds: playerOddsArray,
          teamName,
          league: game.league
        };
      });
      setPlayerStatsData(playerDetails);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDataWithLoading(async () => {
      setIsLoading(true);
      // Check if the schedule for the selected league is already fetched
      if (selectedLeague && (!upcomingGames.length || upcomingGames[0].league !== selectedLeague)) {
        const schedule = await dispatch(getSchedule(dummySport, selectedLeague));
        if (schedule && schedule.length > 0) {
          setUpcomingGames(schedule);
          // Fetch other necessary data based on the new schedule
          const firstGame = schedule[0];
          await fetchInitialDataForGame(firstGame);
        }
      }
    });
  }, [selectedLeague, dispatch, dummySport, upcomingGames]);

  // Handle Team Selection
  useEffect(() => {
    fetchDataWithLoading(async () => {
      setIsLoading(true);
      if (selectedTeam) {
        // Find the game that includes the selected team
        const gameWithSelectedTeam = await upcomingGames.find(game =>
          game.home_team_id === selectedTeam || game.away_team_id === selectedTeam
        );

        if (gameWithSelectedTeam) {
          // Fetch odds for the game with the selected team
          const odds = await dispatch(getGameOdds(gameWithSelectedTeam.game_id));
          if (odds[0].odds && odds[0].odds.length > 0) {
            const playerOdds = _.groupBy(odds[0].odds.filter(odd => odd.player_id), 'player_id');
            const playerIdsInOdds = Object.keys(playerOdds); // Extract player IDs from odds

            // Fetch team players for the selected team only
            const teamPlayersData = await dispatch(getTeamPlayers(dummySport, selectedLeague, selectedTeam));

            // Filter team players to include only those who are also in the odds
            const filteredPlayers = teamPlayersData.filter(player => playerIdsInOdds.includes(player.id));

            const playerDetails = filteredPlayers.map(player => {
              return {
                playerId: player.id,
                playerName: player.player_name,
                playerOdds: playerOdds[player.id] || [],
                teamName: player.team_name,
                league: selectedLeague
              };
            })
            setPlayerStatsData(playerDetails);
          }

        } else {
          // If the selected team is not in the scheduled games, fetch top 5 players from the team
          const teamPlayersData = await dispatch(getTeamPlayers(dummySport, selectedLeague, selectedTeam));
          if (teamPlayersData && teamPlayersData.length > 0) {
            const topFivePlayers = teamPlayersData.slice(0, 5);
            setPlayerStatsData(topFivePlayers.map(player => ({
              playerId: player.id,
              playerName: player.player_name,
              playerOdds: [], // Placeholder for odds
              teamName: player.team_name,
              league: selectedLeague
            })));
          }
        }
        setIsLoading(false);
      }
    });
  }, [selectedTeam]);

  // Handle Player Selection
  useEffect(() => {
    if (selectedPlayer) {
      const playerInStats = playerStatsData.find(p => p.playerId === selectedPlayer);

      // Check if player data needs to be updated
      const needsUpdate = !playerInStats || (playerInStats && playerStatsData.length > 1);

      if (needsUpdate) {
        if (playerInStats) {
          setPlayerStatsData([playerInStats]);
        } else {
          // Check if the player is in currentGameOdds
          let playerOdds = currentGameOdds.flatMap(odds => odds.odds)
            .find(odd => odd.player_id === selectedPlayer);

          if (playerOdds) {
            const playerDetails = {
              playerId: playerOdds.player_id,
              playerName: playerOdds.selection,
              playerOdds: [playerOdds],
              teamName: selectedTeamName, // Determine team name
              league: selectedLeague
            };
            setPlayerStatsData([playerDetails]);
          } else {
            const playerData = playersData.find(p => p.id === selectedPlayer);
            if (playerData) {
              setPlayerStatsData([{
                playerId: playerData.id,
                playerName: playerData.player_name,
                playerOdds: [],
                teamName: playerData.team_name,
                league: selectedLeague
              }]);
            }
          }
        }
      }
    }
  }, [selectedPlayer, playerStatsData, currentGameOdds, playersData, selectedLeague]);

  const getUniqueMarketNames = (playerStatsData) => {
    const marketNames = new Set();

    playerStatsData.forEach(player => {
      player.playerOdds.forEach(odd => {
        // Add market_name to the Set
        marketNames.add(odd.market_name);
      });
    });

    // Convert Set to Array
    return Array.from(marketNames);
  };

  useEffect(() => {
    // Assuming playerStatsData is already populated
    const marketStats = getUniqueMarketNames(playerStatsData);
    setMarketStats(marketStats);
    // Do something with marketStats, like storing in state or using directly
  }, [playerStatsData]);

  // Function to handle click on the "Stat" header
  const handleStatClick = () => {
    setCurrentMarketIndex((prevIndex) =>
      prevIndex < marketStats.length - 1 ? prevIndex + 1 : 0
    );
  };

  // States for each dropdown
  const [isLeagueDropdownOpen, setIsLeagueDropdownOpen] = useState(false);
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const [isPlayerDropdownOpen, setIsPlayerDropdownOpen] = useState(false);

  return (
    <div className="w-full h-screen bg-neutral-50 flex flex-row overflow-hidden">
      <Sidebar />
      <div className="flex flex-col w-full h-screen overflow-y-auto overflow-x-hidden">
        <div className="sticky top-0 z-10 bg-white">
          <Navbar title='Sports I EV' />
        </div>
        <div className="mt-10 ml-10 flex flex-col h-full w-full">
          <div className="flex-col">
            <div className="w-2/3 h-14 flex justify-start items-start gap-6">
              {/* League Dropdown */}
              <div className="flex-grow relative">
                <button onClick={() => setIsLeagueDropdownOpen(!isLeagueDropdownOpen)}
                  className="h-14 px-6 py-4 bg-neutral-50 rounded-lg border border-slate-200 flex justify-between items-center w-full">
                  <span className="text-indigo-950 text-base font-semibold">{selectedLeague || "League"}</span>
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /> </svg>
                </button>
                <ul className={`absolute w-full ${isLeagueDropdownOpen ? 'block' : 'hidden'} text-gray pt-1`}>
                  {leagues && leagues.map((league, index) => (
                    <li key={index}>
                      <div
                        onClick={() => {
                          setSelectedLeague(league);
                          setSelectedTeam(null);
                          setSelectedTeamName(null);
                          setSelectedPlayer(null);
                          setSelectedPlayerName(null);
                          setIsLeagueDropdownOpen(false);
                        }}
                        className="bg-lightGray hover:bg-gray py-2 px-4 block whitespace-no-wrap cursor-pointer">
                        {league}
                      </div>
                    </li>
                  ))}
                </ul>

              </div>
              {/* Team Dropdown */}
              <div className="flex-grow relative">
                <button onClick={() => setIsTeamDropdownOpen(!isTeamDropdownOpen)}
                  className="h-14 px-6 py-4 bg-neutral-50 rounded-lg border border-slate-200 flex justify-between items-center w-full">
                  <span className="text-indigo-950 text-base font-semibold">{selectedTeamName || "Team"}</span>
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /> </svg>
                </button>
                <ul className={`absolute w-full ${isTeamDropdownOpen ? 'block' : 'hidden'} text-gray pt-1 max-h-60 overflow-y-auto`}>
                  {selectedLeague && teams && teams.map((team, index) => (
                    <li key={index}>
                      <div
                        onClick={() => {
                          setSelectedTeam(team.id);
                          setSelectedTeamName(team.team_name);
                          setSelectedPlayer(null);
                          setSelectedPlayerName(null);
                          setIsTeamDropdownOpen(false);
                        }}
                        className="bg-lightGray hover:bg-gray py-2 px-4 block whitespace-no-wrap cursor-pointer">
                        {team.team_name}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Player Dropdown */}
              <div className="flex-grow relative">
                <button onClick={() => setIsPlayerDropdownOpen(!isPlayerDropdownOpen)}
                  className="h-14 px-6 py-4 bg-neutral-50 rounded-lg border border-slate-200 flex justify-between items-center w-full">
                  <span className="text-indigo-950 text-base font-semibold">{selectedPlayerName || "Player"}</span>
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /> </svg>
                </button>
                <ul className={`absolute w-full ${isPlayerDropdownOpen ? 'block' : 'hidden'} text-gray pt-1 max-h-60 overflow-y-auto`}>
                  {selectedTeam && selectedLeague && playersData && playersData.map((player, index) => (
                    <li key={player.id}>
                      <div
                        onClick={() => {
                          setSelectedPlayer(player.id);
                          setSelectedPlayerName(player.player_name);
                          setIsPlayerDropdownOpen(false);
                        }}
                        className="bg-lightGray hover:bg-gray py-2 px-4 block whitespace-no-wrap cursor-pointer">
                        {player.player_name}
                      </div>
                    </li>
                  ))}
                </ul>

              </div>
            </div>
          </div>

          <div className='pt-10 flex-col w-11/12'>
            <div className="w-full overflow-x-auto rounded-t-lg">
              <table className="min-w-full bg-white table-auto">
                <thead className="bg-neutral-900">
                  <tr>
                    {["Player", "Team", "League", "Line", "Projection", "Stat", "Book", "Proj. Hit", "Proj. Play", "Book Line", "Under", "Over", "Book Play", "Des Hit"].map((header, index) => (
                      <th
                        key={index}
                        className={`py-2 px-4 text-white text-left text-xs uppercase font-normal ${header === "Stat" ? 'cursor-pointer' : ''}`}
                        onClick={header === "Stat" ? handleStatClick : null}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                {
                  isLoading ? (
                    <tbody className="min-w-full bg-white table-auto">
                      <tr>
                        <td colSpan={5}
                          style={{ textAlign: 'center', padding: '20px' }}>
                          <Loading />
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    <tbody>
                      {playerStatsData?.map((player, index) => {
                        const currentMarketName = marketStats[currentMarketIndex];
                        const mainOdd = player.playerOdds.find(odd => odd.market_name === currentMarketName && odd.is_main);

                        let line, book, under, over, bookLine;

                        if (mainOdd) {
                          line = mainOdd?.selection_points;
                          book = mainOdd?.sports_book_name;
                          bookLine = mainOdd?.price;
                          if (mainOdd?.selection_line) {
                            const oddsResult = findOppositeCorrespondingOdds(player.playerOdds, mainOdd);
                            under = oddsResult.under;
                            over = oddsResult.over;
                          }
                        }

                        return (
                          <tr key={index} className={`${index % 2 === 0 ? "bg-lightGray" : ""}`}>
                            <td className="py-1 px-1 xl:py-2 xl:px-4 border-b text-sm">{player?.playerName}</td>
                            <td className="py-1 px-1 xl:py-2 xl:px-4 border-b text-sm">{player?.teamName}</td>
                            <td className="py-1 px-1 xl:py-2 xl:px-4 border-b text-sm">{player?.league}</td>
                            <td className="py-1 px-1 xl:py-2 xl:px-4 border-b text-sm">
                              {line}
                            </td>
                            <td className="py-1 px-1 xl:py-2 xl:px-4 border-b text-sm">{/* Projection Here */}</td>
                            <td className="py-1 px-1 xl:py-2 xl:px-4 border-b text-sm">
                              {marketStats[currentMarketIndex]}
                            </td>
                            <td className="py-1 px-1 xl:py-2 xl:px-4 border-b text-sm">
                              {book}
                            </td>
                            <td className="py-1 px-1 xl:py-2 xl:px-4 border-b text-sm">{/* Proj. Hit Here */}</td>
                            <td className="py-1 px-1 xl:py-2 xl:px-4 border-b text-sm">
                              {/* Proj. Play */}
                            </td>
                            <td className="py-1 px-1 xl:py-2 xl:px-4 border-b text-sm">
                              {bookLine}
                            </td>
                            <td className="py-1 px-1 xl:py-2 xl:px-4 border-b text-sm">
                              {under} {/* Under */}
                            </td>
                            <td className="py-1 px-1 xl:py-2 xl:px-4 border-b text-sm">
                              {over} {/* Over */}
                            </td>
                            <td className="py-1 px-1 xl:py-2 xl:px-4 border-b text-sm">{/* Book Play Here */}</td>
                            <td className="py-1 px-1 xl:py-2 xl:px-4 border-b text-sm">{/* Des Hit Here */}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  )
                }
              </table>
            </div>
          </div>
        </div>
      </div>
      <BottomBar />
    </div>
  );
}
