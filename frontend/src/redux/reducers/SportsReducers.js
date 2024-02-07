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
  GET_UPCOMING_MATCHUPS_REQUEST,
  GET_UPCOMING_MATCHUPS_SUCCESS,
  GET_UPCOMING_MATCHUPS_FAILURE,
  GET_SCHEDULE_REQUEST,
  GET_SCHEDULE_SUCCESS,
  GET_SCHEDULE_FAILURE,
} from '../constants/SportsConstants.js';

export const getTeamsReducer = (state = { teams: [] }, action) => {
  switch (action.type) {
    case GET_TEAMS_REQUEST:
      return { loading: true };
    case GET_TEAMS_SUCCESS:
      return { loading: false, teams: action.payload };
    case GET_TEAMS_FAILURE:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};

export const getTeamReducer = (state = { team: [] }, action) => {
  switch (action.type) {
    case GET_TEAM_REQUEST:
      return { loading: true };
    case GET_TEAM_SUCCESS:
      return { loading: false, team: action.payload };
    case GET_TEAM_FAILURE:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};

export const getOddsReducer = (state = { odds: [] }, action) => {
  switch (action.type) {
    case GET_ODDS_REQUEST:
      return { loading: true };
    case GET_ODDS_SUCCESS:
      return { loading: false, odds: action.payload };
    case GET_ODDS_FAILURE:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};

export const getGameOddsReducer = (state = { odds: [] }, action) => {
  switch (action.type) {
    case GET_GAME_ODDS_REQUEST:
      return { loading: true };
    case GET_GAME_ODDS_SUCCESS:
      return { loading: false, odds: action.payload };
    case GET_GAME_ODDS_FAILURE:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};

export const getTeamStatsReducer = (state = { stats: [] }, action) => {
  switch (action.type) {
    case GET_TEAM_STATS_REQUEST:
      return { loading: true };
    case GET_TEAM_STATS_SUCCESS:
      return { loading: false, stats: action.payload };
    case GET_TEAM_STATS_FAILURE:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};

export const getTeamPlayersReducer = (state = { players: [] }, action) => {
  switch (action.type) {
    case GET_TEAM_PLAYERS_REQUEST:
      return { loading: true };
    case GET_TEAM_PLAYERS_SUCCESS:
      return { loading: false, players: action.payload };
    case GET_TEAM_PLAYERS_FAILURE:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};

export const getPlayerReducer = (state = { }, action) => {
  switch (action.type) {
    case GET_PLAYER_REQUEST:
      return { loading: true };
    case GET_PLAYER_SUCCESS:
      return { loading: false, player: action.payload };
    case GET_PLAYER_FAILURE:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};

export const getTeamScheduleReducer = (state = { schedules: [] }, action) => {
  switch (action.type) {
    case GET_TEAM_SCHEDULE_REQUEST:
      return { loading: true };
    case GET_TEAM_SCHEDULE_SUCCESS:
      return { loading: false, schedules: action.payload };
    case GET_TEAM_SCHEDULE_FAILURE:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};

export const getScheduleReducer = (state = { schedules: [] }, action) => {
  switch (action.type) {
    case GET_SCHEDULE_REQUEST:
      return { loading: true };
    case GET_SCHEDULE_SUCCESS:
      return { loading: false, schedules: action.payload };
    case GET_SCHEDULE_FAILURE:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};

export const getPropBetsReducer = (state = { }, action) => {
  switch (action.type) {
    case GET_PROP_BETS_REQUEST:
      return { loading: true };
    case GET_PROP_BETS_SUCCESS:
      return { loading: false, propBets: action.payload };
    case GET_PROP_BETS_FAILURE:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};

export const getLeaguesReducer = (state = { leagues: [] }, action) => {
  switch (action.type) {
    case GET_LEAGUES_REQUEST:
      return { loading: true };
    case GET_LEAGUES_SUCCESS:
      return { loading: false, leagues: action.payload };
    case GET_LEAGUES_FAILURE:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};

const initialState = {
  matchups: {
    NBA: [],
    NFL: [],
    NHL: [],
    MLB: [],
    UFC: [],
    // other sports...
  },
  loading: false,
  error: null,
};

export const getUpcomingMatchupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_UPCOMING_MATCHUPS_REQUEST:
      return { ...state, loading: true };
    case GET_UPCOMING_MATCHUPS_SUCCESS:
      // Use the category from the action to update the specific category matchups
      const category = action.category;
      return { 
        ...state,
        loading: false,
        matchups: {
          ...state.matchups,
          [category]: action.payload
        }
      };
    case GET_UPCOMING_MATCHUPS_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};