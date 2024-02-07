import express from "express";
import asyncHandler from "express-async-handler";
import axios from 'axios';
import dotenv from 'dotenv';
import { getColorFromURL } from "color-thief-node";

dotenv.config();
const sportRouter = express.Router();

const ODDSJAM_API_ENDPOINT = 'https://api-external.oddsjam.com/api/v2';
const ODDSJAM_API_KEY = process.env.ODDSJAM_API_KEY;

// GET TEAMS
sportRouter.get(
  "/top-teams",
  asyncHandler(async (req, res) => {
    try {
      const sport = req.query.sport;
      const league = req.query.league;

      const response = await axios.get(`${ODDSJAM_API_ENDPOINT}/teams`, {
        params: {
          key: ODDSJAM_API_KEY,
          sport: sport,
          league: league,
          include_logos: true
        }
      });

      const teams = response.data.data;

      const top30Teams = teams.slice(0, 30);

      res.json(top30Teams);

    } catch (error) {
      res.status(500)
      throw new Error('Error fetching top teams:', error);
    }
  })
);

function calculateLuminance([r, g, b]) {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function adjustColorBrightness(rgbArray, adjustment) {
  return rgbArray.map(color => {
    color += adjustment;
    return Math.max(Math.min(255, color), 0); // Ensure values stay between 0 and 255
  });
}

// GET TEAM
sportRouter.get(
  "/team",
  asyncHandler(async (req, res) => {
    try {
      const teamId = req.query.teamId;

      const response = await axios.get(`${ODDSJAM_API_ENDPOINT}/teams`, {
        params: {
          key: ODDSJAM_API_KEY,
          id: teamId,
          include_logos: true,
          include_records: true,
        }
      });

      const team = response.data.data;

      // Extract the dominant color from the team logo
  const dominantColor = await getColorFromURL(team[0].logo);

  // Determine if the color is light or dark
  const luminance = calculateLuminance(dominantColor);
  const isLightColor = luminance > 0.5;

  // Adjust the color brightness based on whether it's light or dark
  const brightnessAdjustment = isLightColor ? -30 : 30; // Adjust value as needed
  const adjustedColor = adjustColorBrightness(dominantColor, brightnessAdjustment);

  // Add the dominant color to the team data
  const teamDataWithColor = [{
    ...team[0],
    dominantColor: `rgb(${adjustedColor.join(', ')})`
  }];

  res.json(teamDataWithColor);
    } catch (error) {
      res.status(500)
      throw new Error('Error fetching top teams:', error);
    }
  })
);

// GET UPCOMING ODDS
sportRouter.get(
  "/upcoming-odds",
  asyncHandler(async (req, res) => {
    try {
      const sport = req.query.sport;
      const league = req.query.league;

      // Calculate the date range
      const today = new Date();
      const sevenDaysFromNow = new Date(today);
      sevenDaysFromNow.setDate(today.getDate() + 200);

      const startDateAfter = today.toISOString();
      const startDateBefore = sevenDaysFromNow.toISOString();

      const gamesResponse = await axios.get(`${ODDSJAM_API_ENDPOINT}/games`, {
        params: {
          key: ODDSJAM_API_KEY,
          sport: sport,
          league: league,
          start_date_after: startDateAfter,
          start_date_before: startDateBefore,
          include_team_info: true,
        }
      });

      const sortedGames = gamesResponse.data.data.sort((a, b) => {
        return new Date(a.start_date) - new Date(b.start_date);
      });

      const batch = sortedGames.slice(0, 10);

      const oddsPromises = batch.map(game => {
        return axios.get(`${ODDSJAM_API_ENDPOINT}/game-odds`, {
          params: {
            key: ODDSJAM_API_KEY,
            game_id: game.id,
            sportsbook: 'DraftKings',
          }
        });
      });

      // Wait for all promises to complete
      const oddsResponses = await Promise.all(oddsPromises);

      // Extract the data from each response
      const aggregatedOdds = oddsResponses.map(response => response.data.data).flat();

      res.json(aggregatedOdds);
    } catch (error) {
      res.status(500)
      throw new Error('Failed to fetch top odds:', error);
    }
  })
);

// GET GAME ODDS
sportRouter.get(
  "/game-odds",
  asyncHandler(async (req, res) => {
    try {
      const gameId = req.query.gameId;

      const response = await axios.get(`${ODDSJAM_API_ENDPOINT}/game-odds`, {
        params: {
          key: ODDSJAM_API_KEY,
          game_id: gameId,
          sportsbook: 'DraftKings',
        }
      });

      const odds = response.data.data;

      res.json(odds);

    } catch (error) {
      res.status(500)
      throw new Error('Failed to fetch top odds:', error);
    }
  })
);

const getTeamDetails = async (teamName, teamId, sport, league) => {
  try {
    const response = await axios.get(`${ODDSJAM_API_ENDPOINT}/teams/`, {
      params: {
        key: ODDSJAM_API_KEY,
        name: teamName,
        id: teamId,
        sport: sport,
        league: league,
        include_logos: true,
        include_records: true,
      }
    });
    return response.data.data[0];
  } catch (error) {
    console.error('Failed to fetch team details:', error);
    return null;
  }
};

const getGameOdds = async (gameId) => {
  try {
    const response = await axios.get(`${ODDSJAM_API_ENDPOINT}/game-odds`, {
      params: {
        key: ODDSJAM_API_KEY,
        game_id: gameId,
        sportsbook: 'DraftKings',
        is_main: true
      }
    });
    return response.data.data[0];
  } catch (error) {
    console.error('Failed to fetch team details:', error);
    return null;
  }
};

const fetchGameOdds = async (gameId) => {
  try {
    const oddsResponse = await axios.get(`${ODDSJAM_API_ENDPOINT}/historical-odds`, {
      params: {
        key: ODDSJAM_API_KEY,
        game_id: gameId,
        sportsbook: 'DraftKings',
        market_name: 'moneyline',
        is_main: true
      }
    });
    const odds = oddsResponse.data.data;

    return odds;
  } catch (error) {
    console.error('Failed to fetch game odds:', error);
    return null;
  }
};

const fetchPlayerGameOdds = async (playerId, gameId) => {
  try {
    const oddsResponse = await axios.get(`${ODDSJAM_API_ENDPOINT}/game-odds`, {
      params: {
        key: ODDSJAM_API_KEY,
        player_id: playerId,
        game_id: gameId,
        sportsbook: 'DraftKings',
      }
    });
    const odds = oddsResponse.data.data;

    return odds[0];
  } catch (error) {
    console.error('Failed to fetch game odds:', error);
    return null;
  }
};

// GET TEAM STATS
sportRouter.get(
  "/team-stats",
  asyncHandler(async (req, res) => {
    try {
      const sport = req.query.sport;
      const league = req.query.league;
      const team = req.query.team;

      // Calculate the date range
      const today = new Date();
      const tenDaysAgo = new Date(today);
      tenDaysAgo.setDate(today.getDate() - 200);

      const startDateAfter = tenDaysAgo.toISOString();
      const startDateBefore = today.toISOString();

      const gamesResponse = await axios.get(`${ODDSJAM_API_ENDPOINT}/games`, {
        params: {
          key: ODDSJAM_API_KEY,
          sport: sport,
          league: league,
          start_date_after: startDateAfter,
          start_date_before: startDateBefore,
          include_team_info: true,
        }
      });

      // Filter games that have the same home_team or away_team as the provided team
      const filteredGames = gamesResponse.data.data.filter(game => game.home_team === team || game.away_team === team);

      const sortedGames = filteredGames.sort((a, b) => {
        return new Date(b.start_date) - new Date(a.start_date);
      });

      const gamesScoresPromises = sortedGames.map(game => {
        return axios.get(`${ODDSJAM_API_ENDPOINT}/scores`, {
          params: {
            key: ODDSJAM_API_KEY,
            sport: sport,
            league: league,
            game_id: game.id,
            status: 'Completed',
            include_starting_lineups: true,
          }
        });
      });

      // Wait for all promises to complete
      const gamesScoresResponses = await Promise.all(gamesScoresPromises);

      // Extract the data from each response and merge with game info
      const validGameScoresResponses = gamesScoresResponses.filter(response => {
        const gameScore = response.data.data[0];
        return gameScore && gameScore.home_team && gameScore.away_team;
      });

      const allGamesWithScores = await Promise.all(validGameScoresResponses.map(async (response, index) => {
        const gameScore = response.data.data[0];
        const gameInfo = filteredGames[index];
        const dummyTeamId = null

        const homeTeamDetails = await getTeamDetails(gameScore.home_team, gameScore.home_team_id, gameScore.sport, gameScore.league);
        const awayTeamDetails = await getTeamDetails(gameScore.away_team, gameScore.away_team_id, gameScore.sport, gameScore.league);
        const gameOdds = await fetchGameOdds(gameScore.game_id);

        return {
          ...gameScore,
          home_team_info: homeTeamDetails,
          away_team_info: awayTeamDetails,
          odds: gameOdds
        };
      }));

      const aggregatedGames = allGamesWithScores.map(game => {
        // Filter games where the two specific teams played against each other
        const headToHeadGames = allGamesWithScores.filter(g =>
          (g.home_team === game.home_team && g.away_team === game.away_team) ||
          (g.home_team === game.away_team && g.away_team === game.home_team)
        );

        // Count the number of wins for the team in question
        const teamWins = headToHeadGames.reduce((count, g) => {
          if (g.home_team === team && g.score_home_total > g.score_away_total) {
            return count + 1;
          } else if (g.away_team === team && g.score_away_total > g.score_home_total) {
            return count + 1;
          }
          return count;
        }, 0);

        // Determine ATS result
        const totalGames = headToHeadGames.length;
        const atsResult = teamWins > totalGames / 2 ? `W-${teamWins}` : `L-${totalGames - teamWins}`;

        return {
          ...game,
          ats: atsResult
        };
      });

      // Slice to get only the last 10 games
      const last10Games = aggregatedGames.slice(0, 10);

      res.json(last10Games);
    } catch (error) {
      res.status(500)
      console.error('Error:', error.message);
      throw new Error('Failed to fetch team stats:', error);
    }
  })
);

// GET TEAM PLAYERS
sportRouter.get(
  "/team-players",
  asyncHandler(async (req, res) => {
    try {
      const teamId = req.query.teamId;
      const sport = req.query.sport;
      const league = req.query.league;

      const response = await axios.get(`${ODDSJAM_API_ENDPOINT}/players/list`, {
        params: {
          key: ODDSJAM_API_KEY,
          team: teamId,
          sport: sport,
          league: league,
          include_logos: true,
          is_active: true
        }
      });

      const players = response.data.data;

      res.json(players);

    } catch (error) {
      res.status(500)
      console.error('Error:', error.message);
      throw new Error('Failed to fetch team players:', error);
    }
  })
);

// GET PLAYER
sportRouter.get(
  "/player",
  asyncHandler(async (req, res) => {
    try {
      const playerId = req.query.playerId;
      const noOdds = req.query.noOdds;

      // Fetch player details
      const playerResponse = await axios.get(`${ODDSJAM_API_ENDPOINT}/players/list`, {
        params: {
          key: ODDSJAM_API_KEY,
          id: playerId,
          include_logos: true,
        }
      });

      const player = playerResponse.data.data;

      // Fetch team details using player team id
      const teamResponse = await axios.get(`${ODDSJAM_API_ENDPOINT}/teams`, {
        params: {
          key: ODDSJAM_API_KEY,
          name: player[0].team_name,
          league: player[0].league,
          sport: player[0].sport,
          include_logos: true,
        }
      });

      const teamDetails = teamResponse.data.data;

      // Fetch player results
      const playerResultsResponse = await axios.get(`${ODDSJAM_API_ENDPOINT}/player-results`, {
        params: {
          key: ODDSJAM_API_KEY,
          player_id: playerId,
          status: 'Completed'
        }
      });

      const playerResults = playerResultsResponse.data.data;

      // Fetch game scores for each game in player results
      const gameScoresPromises = playerResults.map(result => {
        return axios.get(`${ODDSJAM_API_ENDPOINT}/scores`, {
          params: {
            key: ODDSJAM_API_KEY,
            game_id: result.game_id,
          }
        });
      });

      const gameScoresResponses = await Promise.all(gameScoresPromises);
      const gameScores = gameScoresResponses.map(response => response.data.data[0]);
      const playerOdds = noOdds === 'true' ? null : await getPlayerEV(player[0].sport, player[0].league, playerId, player[0].team_name, teamDetails.id)

      // Combine player details, results, and game scores
      const combinedData = {
        playerDetails: player,
        teamDetails: teamDetails,
        playerOdds: playerOdds,
        playerResultsWithScores: playerResults.map(result => {
          const gameScore = gameScores.find(score => score.game_id === result.game_id);
          return {
            ...result,
            gameScore: gameScore
          };
        })
      };

      res.json(combinedData);

    } catch (error) {
      res.status(500);
      console.error('Error:', error.message);
      throw new Error('Failed to fetch player:', error);
    }
  })
);

// GET TEAM SCHEDULE
sportRouter.get(
  "/team-schedule",
  asyncHandler(async (req, res) => {
    try {
      const team = req.query.team;
      const sport = req.query.sport;
      const league = req.query.league;

      // Calculate the date range
      const today = new Date();
      const tenDaysAgo = new Date(today);
      tenDaysAgo.setDate(today.getDate() + 70);

      const startDateBefore = tenDaysAgo.toISOString();
      const startDateAfter = today.toISOString();

      const response = await axios.get(`${ODDSJAM_API_ENDPOINT}/schedules/list`, {
        params: {
          key: ODDSJAM_API_KEY,
          sport: sport,
          league: league,
          start_date_after: startDateAfter,
          start_date_before: startDateBefore,
        }
      });

      const schedule = response.data.data;
      const filteredGames = schedule.filter(game => game.home_team === team || game.away_team === team);

      const allGamesWithScores = await Promise.all(filteredGames.map(async (response, index) => {
        const gameScore = response;

        const homeTeamDetails = await getTeamDetails(gameScore.home_team, gameScore.home_team_id, gameScore.sport, gameScore.league);
        const awayTeamDetails = await getTeamDetails(gameScore.away_team, gameScore.away_team_id, gameScore.sport, gameScore.league);
        const gameOdds = await getGameOdds(gameScore.game_id);

        return {
          ...gameScore,
          home_team_info: homeTeamDetails,
          away_team_info: awayTeamDetails,
          odds: gameOdds
        };
      }));

      res.json(allGamesWithScores);

    } catch (error) {
      res.status(500)
      console.error('Error:', error.message);
      throw new Error('Failed to fetch team schedule:', error);
    }
  })
);

// GET SCHEDULE
sportRouter.get(
  "/schedule",
  asyncHandler(async (req, res) => {
    try {
      const sport = req.query.sport;
      const league = req.query.league;

      // Calculate the date range
      const today = new Date();
      const tenDaysAgo = new Date(today);
      tenDaysAgo.setDate(today.getDate() + 7);

      const startDateBefore = tenDaysAgo.toISOString();
      const startDateAfter = today.toISOString();

      const response = await axios.get(`${ODDSJAM_API_ENDPOINT}/schedules/list`, {
        params: {
          key: ODDSJAM_API_KEY,
          sport: sport,
          league: league,
          include_team_ids: true,
          start_date_after: startDateAfter,
          start_date_before: startDateBefore,
        }
      });

      const schedule = response.data.data;

      res.json(schedule);

    } catch (error) {
      res.status(500)
      console.error('Error:', error.message);
      throw new Error('Failed to fetch team schedule:', error);
    }
  })
);

// GET PROP BETS
sportRouter.get(
  "/prop-bets",
  asyncHandler(async (req, res) => {
    try {
      const gameId = req.query.gameId;

      const gameResponse = await axios.get(`${ODDSJAM_API_ENDPOINT}/games`, {
        params: {
          key: ODDSJAM_API_KEY,
          id: gameId,
        }
      });
      const game = gameResponse.data.data[0];

      const homeTeamDetails = await getTeamDetails(game.home_team, game.home_team_id, game.sport, game.league);
      const awayTeamDetails = await getTeamDetails(game.away_team, game.away_team_id, game.sport, game.league);
      const odds = await getGameOdds(game.id);

      // Fetch players for home team
      const homeTeamPlayersResponse = await axios.get(`${ODDSJAM_API_ENDPOINT}/players/list`, {
        params: {
          key: ODDSJAM_API_KEY,
          team: homeTeamDetails.id,
          sport: game.sport,
          league: game.league,
          is_active: true
        }
      });
      const homeTeamPlayers = homeTeamPlayersResponse.data.data;

      // Fetch players for away team
      const awayTeamPlayersResponse = await axios.get(`${ODDSJAM_API_ENDPOINT}/players/list`, {
        params: {
          key: ODDSJAM_API_KEY,
          team: awayTeamDetails.id,
          sport: game.sport,
          league: game.league,
          is_active: true
        }
      });
      const awayTeamPlayers = awayTeamPlayersResponse.data.data;

      res.json({
        gameScore: game,
        gameOdds: odds,
        home_team_info: homeTeamDetails,
        away_team_info: awayTeamDetails,
        home_team_players: homeTeamPlayers,
        away_team_players: awayTeamPlayers,
      });
    } catch (error) {
      res.status(500);
      console.error('Error:', error.message);
      throw new Error('Failed to fetch prop bets:', error);
    }
  })
);

// GET SPORT LEAGUES
sportRouter.get(
  "/sport-leagues",
  asyncHandler(async (req, res) => {
    try {
      const sport = req.query.sport;

      const response = await axios.get(`${ODDSJAM_API_ENDPOINT}/leagues`, {
        params: {
          key: ODDSJAM_API_KEY,
          sport: sport,
        }
      });

      const leagues = response.data.data;

      res.json(leagues);

    } catch (error) {
      res.status(500)
      console.error('Error:', error.message);
      throw new Error('Failed to fetch sport league:', error);
    }
  })
);

// Function to get player EV
async function getPlayerEV(sport, league, playerId, team, teamId) {
  try {
    // Calculate the date range
    const today = new Date();
    const startDateBefore = new Date(today.setDate(today.getDate() + 70)).toISOString();
    const startDateAfter = new Date().toISOString();

    // Get the schedule to find the game ID
    const schedulesResponse = await axios.get(`${ODDSJAM_API_ENDPOINT}/schedules/list`, {
      params: {
        key: ODDSJAM_API_KEY,
        sport: sport,
        league: league,
        start_date_after: startDateAfter,
        start_date_before: startDateBefore,
      }
    });

    const schedule = schedulesResponse.data.data;
    const filteredGames = schedule.filter(game => game.home_team === team || game.away_team === team);

    // If no games are scheduled, return an empty array
    if (filteredGames.length === 0) {
      return [];
    }

    // Sort the filtered games by start date in ascending order
    const sortedGames = filteredGames.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));

    // Select the game that will be played soonest
    const nextGame = sortedGames[0];

    // Get the odds for the specified player and game
    const response = await axios.get(`${ODDSJAM_API_ENDPOINT}/game-odds`, {
      params: {
        key: ODDSJAM_API_KEY,
        game_id: nextGame.game_id,
        player_id: playerId,
        team_id: teamId,
        sportsbook: 'DraftKings',
      }
    });

    const odds = response.data.data;

    // Return the odds data
    return odds[0] ? odds[0] : [];

  } catch (error) {
    console.error('Error:', error.message);
    // Depending on how you want to handle errors, you might want to return an empty array here as well
    // return [];
    throw new Error('Failed to fetch player odds:', error.message);
  }
}

// GET UPCOMING MATCHUPS
sportRouter.get(
  "/upcoming-matchups",
  asyncHandler(async (req, res) => {
    try {
      const sport = req.query.sport;
      const league = req.query.league;

      // Calculate the date range
      const today = new Date();
      const tenDaysAgo = new Date(today);
      tenDaysAgo.setDate(today.getDate() + 40);

      const startDateBefore = tenDaysAgo.toISOString();
      const startDateAfter = today.toISOString();

      const schedulesResponse = await axios.get(`${ODDSJAM_API_ENDPOINT}/schedules/list`, {
        params: {
          key: ODDSJAM_API_KEY,
          sport: sport,
          league: league,
          include_team_ids: true,
          start_date_after: startDateAfter,
          start_date_before: startDateBefore,
        }
      });

      const games = schedulesResponse.data.data;

      // Slice the games array to get only the first 9 games
      const slicedGames = games.slice(0, 9);

      // Fetch team details for each game
      const gamesWithTeamDetails = await Promise.all(slicedGames.map(async (game) => {
        const homeTeamDetails = await getTeamDetails(game.home_team, game.home_team_id, sport, league);
        const awayTeamDetails = await getTeamDetails(game.away_team, game.away_team_id, sport, league);
        const odds = await getGameOdds(game.game_id);

        return {
          ...game,
          home_team_details: homeTeamDetails,
          away_team_details: awayTeamDetails,
          odds: odds
        };
      }));

      res.json(gamesWithTeamDetails);
    } catch (error) {
      res.status(500);
      console.error('Error:', error.message);
      throw new Error('Failed to fetch upcoming games:', error);
    }
  })
);

// GET RANDOM UPCOMING MATCHUPS
sportRouter.get(
  "/random-upcoming-matchups",
  asyncHandler(async (req, res) => {
    try {
      const sport = 'football';

      // Calculate the date range
      const today = new Date();
      const tenDaysAgo = new Date(today);
      tenDaysAgo.setDate(today.getDate() + 2);

      const startDateBefore = tenDaysAgo.toISOString();
      const startDateAfter = today.toISOString();

      const schedulesResponse = await axios.get(`${ODDSJAM_API_ENDPOINT}/schedules/list`, {
        params: {
          key: ODDSJAM_API_KEY,
          sport: sport,
          start_date_after: startDateAfter,
          start_date_before: startDateBefore,
        }
      });

      const games = schedulesResponse.data.data;

      // Fetch team details for each game
      const gamesWithTeamDetails = await Promise.all(games.map(async (game) => {
        const homeTeamDetails = await getTeamDetails(game.home_team, game.home_team_id, sport, game.league);
        const awayTeamDetails = await getTeamDetails(game.away_team, game.away_team_id, sport, game.league);
        const odds = await getGameOdds(game.game_id);

        return {
          ...game,
          home_team_details: homeTeamDetails,
          away_team_details: awayTeamDetails,
          odds: odds
        };
      }));

      res.json(gamesWithTeamDetails);
    } catch (error) {
      res.status(500);
      console.error('Error:', error.message);
      throw new Error('Failed to fetch upcoming games:', error);
    }
  })
);

// GET PLAYER EV
sportRouter.get(
  "/player-ev",
  asyncHandler(async (req, res) => {
    try {
      const sport = req.query.sport;
      const league = req.query.league;
      const playerId = req.query.playerId;

      const schedulesResponse = await axios.get(`${ODDSJAM_API_ENDPOINT}/schedules/list`, {
        params: {
          key: ODDSJAM_API_KEY,
          sport: sport,
          league: league,
          sportsbook: 'DraftKings'
        }
      });

      const game = schedulesResponse.data.data[0];

      const response = await axios.get(`${ODDSJAM_API_ENDPOINT}/game-odds`, {
        params: {
          key: ODDSJAM_API_KEY,
          game_id: game.game_id,
          player_id: playerId,
          sportsbook: 'DraftKings',
          market_name: 'Player Passing Yards',
        }
      });

      const odds = response.data.data;

      res.json(odds);

    } catch (error) {
      res.status(500)
      console.error('Error:', error.message);
      throw new Error('Failed to fetch player odds:', error);
    }
  })
);

// LIVE ODDS
sportRouter.get(
  "/live-odds",
  asyncHandler(async (req, res) => {
    try {
      // Set headers for SSE
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      });

      // Set up the connection to the OddsJam API
      const oddsJamResponse = await axios.get(`${ODDSJAM_API_ENDPOINT}/stream/odds`, {
        params: {
          key: process.env.ODDSJAM_API_KEY,
          sportsbooks: req.query.sportsbooks,
          market: req.query.market,
          league: req.query.league,
          // Add other parameters as needed
        },
        responseType: 'stream',
      });

      // Handle the stream of data from OddsJam
      oddsJamResponse.data.on('data', (chunk) => {
        // Forward the data to the client
        res.write(`data: ${chunk.toString()}\n\n`);
      });

      // Handle any errors
      oddsJamResponse.data.on('error', (error) => {
        console.error('Stream encountered an error', error);
        res.end();
      });

      // Handle client disconnect
      req.on('close', () => {
        console.log('Client closed connection');
        oddsJamResponse.data.destroy();
      });

    } catch (error) {
      res.status(500).send('Failed to fetch live odds');
      console.error('Error:', error.message);
    }
  })
);

// LIVE GAME SCORES
sportRouter.get(
  "/live-scores",
  asyncHandler(async (req, res) => {
    try {
      const { sport, league, game_id } = req.query;
      console.log('TEST', sport, league, game_id)
      const response = await axios.get(`${ODDSJAM_API_ENDPOINT}/scores`, {
        params: {
          key: process.env.ODDSJAM_API_KEY,
          sport,
          league,
          game_id,
          live: true,
          status: 'Live',
        }
      });
      console.log('TEST@', response.date)

      // Send the response data back to the client
      res.json(response.data);

    } catch (error) {
      res.status(500).send('Failed to fetch live game scores');
      console.error('Error:', error.message);
    }
  })
);

export default sportRouter;