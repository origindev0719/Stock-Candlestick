import axios from 'axios';
import {
  GET_TEAMS_REQUEST,
  GET_TEAMS_SUCCESS,
  GET_TEAMS_FAILURE,
  GET_ODDS_REQUEST,
  GET_ODDS_SUCCESS,
  GET_ODDS_FAILURE,
  GET_TEAM_REQUEST,
  GET_TEAM_SUCCESS,
  GET_TEAM_FAILURE,
  GET_TEAM_STATS_REQUEST,
  GET_TEAM_STATS_SUCCESS,
  GET_TEAM_STATS_FAILURE,
  GET_GAME_ODDS_REQUEST,
  GET_GAME_ODDS_SUCCESS,
  GET_GAME_ODDS_FAILURE,
  GET_TEAM_PLAYERS_REQUEST,
  GET_TEAM_PLAYERS_SUCCESS,
  GET_TEAM_PLAYERS_FAILURE,
  GET_PLAYER_REQUEST,
  GET_PLAYER_SUCCESS,
  GET_PLAYER_FAILURE,
  GET_TEAM_SCHEDULE_REQUEST,
  GET_TEAM_SCHEDULE_SUCCESS,
  GET_TEAM_SCHEDULE_FAILURE,
  GET_PROP_BETS_REQUEST,
  GET_PROP_BETS_SUCCESS,
  GET_PROP_BETS_FAILURE,
  GET_LEAGUES_REQUEST,
  GET_LEAGUES_SUCCESS,
  GET_LEAGUES_FAILURE,
  GET_LIVE_GAME_SCORES_REQUEST,
  GET_LIVE_GAME_SCORES_SUCCESS,
  GET_LIVE_GAME_SCORES_FAILURE,
  GET_PLAYER_ODDS_REQUEST,
  GET_PLAYER_ODDS_SUCCESS,
  GET_PLAYER_ODDS_FAILURE,
  GET_UPCOMING_MATCHUPS_REQUEST,
  GET_UPCOMING_MATCHUPS_SUCCESS,
  GET_UPCOMING_MATCHUPS_FAILURE,
  GET_RANDOM_UPCOMING_MATCHUPS_REQUEST,
  GET_RANDOM_UPCOMING_MATCHUPS_SUCCESS,
  GET_RANDOM_UPCOMING_MATCHUPS_FAILURE,
  GET_SCHEDULE_REQUEST,
  GET_SCHEDULE_SUCCESS,
  GET_SCHEDULE_FAILURE,
} from '../constants/SportsConstants.js';
import { URL } from "../Url";

export const getTeams = (sport, league) => async dispatch => {
  dispatch({ type: GET_TEAMS_REQUEST });
  try {
    const response = await axios.get(`${URL}/api/sports/top-teams`, {
      params: {
        sport: sport,
        league: league
      }
    });
    dispatch({ type: GET_TEAMS_SUCCESS, payload: response.data });
    return response.data
  } catch (error) {
    dispatch({ type: GET_TEAMS_FAILURE, error });
  }
};

export const getTeam = (teamId) => async dispatch => {
  dispatch({ type: GET_TEAM_REQUEST });
  try {
    const response = await axios.get(`${URL}/api/sports/team`, {
      params: {
        teamId: teamId,
      }
    });
    dispatch({ type: GET_TEAM_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_TEAM_FAILURE, error });
  }
};

export const getOdds = (sport, league) => async dispatch => {
  dispatch({ type: GET_ODDS_REQUEST });
  try {
    const response = await axios.get(`${URL}/api/sports/upcoming-odds`, {
      params: {
        sport: sport,
        league: league,
      }
    });
    dispatch({ type: GET_ODDS_SUCCESS, payload: response.data });
    return response.data
  } catch (error) {
    dispatch({ type: GET_ODDS_FAILURE, error });
  }
};

export const getGameOdds = (gameId) => async dispatch => {
  dispatch({ type: GET_GAME_ODDS_REQUEST });
  try {
    const response = await axios.get(`${URL}/api/sports/game-odds`, {
      params: {
        gameId: gameId,
      }
    });
    dispatch({ type: GET_GAME_ODDS_SUCCESS, payload: response.data });
    return response.data
  } catch (error) {
    dispatch({ type: GET_GAME_ODDS_FAILURE, error });
  }
};

export const getTeamStats = (sport, league, team) => async dispatch => {
  dispatch({ type: GET_TEAM_STATS_REQUEST });
  try {
    const response = await axios.get(`${URL}/api/sports/team-stats`, {
      params: {
        team: team,
        sport: sport,
        league: league,
      }
    });
    dispatch({ type: GET_TEAM_STATS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_TEAM_STATS_FAILURE, error });
  }
};

export const getTeamPlayers = (sport, league, teamId) => async dispatch => {
  dispatch({ type: GET_TEAM_PLAYERS_REQUEST });
  try {
    const response = await axios.get(`${URL}/api/sports/team-players`, {
      params: {
        teamId: teamId,
        sport: sport,
        league: league,
      }
    });
    dispatch({ type: GET_TEAM_PLAYERS_SUCCESS, payload: response.data });
    return response.data
  } catch (error) {
    dispatch({ type: GET_TEAM_PLAYERS_FAILURE, error });
  }
};

export const getPlayer = (playerId, noOdds) => async dispatch => {
  dispatch({ type: GET_PLAYER_REQUEST });
  try {
    const response = await axios.get(`${URL}/api/sports/player`, {
      params: {
        playerId: playerId,
        noOdds: noOdds,
      }
    });
    dispatch({ type: GET_PLAYER_SUCCESS, payload: response.data });
    return response.data
  } catch (error) {
    dispatch({ type: GET_PLAYER_FAILURE, error });
  }
};

export const getTeamSchedule = (sport, league, team) => async dispatch => {
  dispatch({ type: GET_TEAM_SCHEDULE_REQUEST });
  try {
    const response = await axios.get(`${URL}/api/sports/team-schedule`, {
      params: {
        team: team,
        sport: sport,
        league: league,
      }
    });
    dispatch({ type: GET_TEAM_SCHEDULE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_TEAM_SCHEDULE_FAILURE, error });
  }
};

export const getSchedule = (sport, league) => async dispatch => {
  dispatch({ type: GET_SCHEDULE_REQUEST });
  try {
    const response = await axios.get(`${URL}/api/sports/schedule`, {
      params: {
        sport: sport,
        league: league,
      }
    });
    dispatch({ type: GET_SCHEDULE_SUCCESS, payload: response.data });
    return response.data
  } catch (error) {
    dispatch({ type: GET_SCHEDULE_FAILURE, error });
  }
};

export const getPropBets = (gameId) => async dispatch => {
  dispatch({ type: GET_PROP_BETS_REQUEST });
  try {
    const response = await axios.get(`${URL}/api/sports/prop-bets`, {
      params: {
        gameId: gameId,
      }
    });
    dispatch({ type: GET_PROP_BETS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_PROP_BETS_FAILURE, error });
  }
};

export const getLeagues = (sport) => async dispatch => {
  dispatch({ type: GET_LEAGUES_REQUEST });
  try {
    const response = await axios.get(`${URL}/api/sports/sport-leagues`, {
      params: {
        sport: sport,
      }
    });
    dispatch({ type: GET_LEAGUES_SUCCESS, payload: response.data });
    return response.data
  } catch (error) {
    dispatch({ type: GET_LEAGUES_FAILURE, error });
  }
};

export const getLiveScores = (sport, league, game_id) => async dispatch => {
  dispatch({ type: GET_LIVE_GAME_SCORES_REQUEST });
  try {
    const response = await axios.get(`${URL}/api/sports/live-scores`, {
      params: {
        sport: sport,
        league: league,
        game_id: game_id,
      }
    });
    dispatch({ type: GET_LIVE_GAME_SCORES_SUCCESS, payload: response.data });
    return response.data
  } catch (error) {
    dispatch({ type: GET_LIVE_GAME_SCORES_FAILURE, error });
  }
};

export const getLiveOdds = () => async dispatch => {
  dispatch({ type: GET_LIVE_GAME_SCORES_REQUEST });
  try {
    const response = await axios.get(`${URL}/api/sports/live-odds`);
    dispatch({ type: GET_LIVE_GAME_SCORES_SUCCESS, payload: response.data });
    return response.data
  } catch (error) {
    dispatch({ type: GET_LIVE_GAME_SCORES_FAILURE, error });
  }
};

export const getPlayerOdds = (sport, league, playerId) => async dispatch => {
  dispatch({ type: GET_PLAYER_ODDS_REQUEST });
  try {
    const response = await axios.get(`${URL}/api/sports/player-ev`, {
      params: {
        sport: sport,
        league: league,
        playerId: playerId,
      }
    });
    dispatch({ type: GET_PLAYER_ODDS_SUCCESS, payload: response.data });
    return response.data
  } catch (error) {
    dispatch({ type: GET_PLAYER_ODDS_FAILURE, error });
  }
};

export const getUpcomingMatchups = (sport, league) => async dispatch => {
  dispatch({ type: GET_UPCOMING_MATCHUPS_REQUEST });
  try {
    const response = await axios.get(`${URL}/api/sports/upcoming-matchups`, {
      params: {
        sport: sport,
        league: league,
      }
    });
    dispatch({ type: GET_UPCOMING_MATCHUPS_SUCCESS, payload: response.data, category: league });
    return response.data
  } catch (error) {
    dispatch({ type: GET_UPCOMING_MATCHUPS_FAILURE, error });
  }
};

export const getRandomUpcomingMatchups = () => async dispatch => {
  dispatch({ type: GET_RANDOM_UPCOMING_MATCHUPS_REQUEST });
  try {
    const response = await axios.get(`${URL}/api/sports/random-upcoming-matchups`);
    dispatch({ type: GET_RANDOM_UPCOMING_MATCHUPS_SUCCESS, payload: response.data });
    return response.data
  } catch (error) {
    dispatch({ type: GET_RANDOM_UPCOMING_MATCHUPS_FAILURE, error });
  }
};