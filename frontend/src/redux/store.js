import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { 
  GET_GAME_ODDS_SUCCESS, 
  GET_LEAGUES_SUCCESS, 
  GET_ODDS_SUCCESS, 
  GET_PLAYER_SUCCESS, 
  GET_PROP_BETS_SUCCESS, 
  GET_TEAMS_SUCCESS, 
  GET_TEAM_PLAYERS_SUCCESS, 
  GET_TEAM_SCHEDULE_SUCCESS, 
  GET_TEAM_STATS_SUCCESS, 
  GET_TEAM_SUCCESS 
} from "./constants/SportsConstants";
import {
  suggestedUsersReducer,
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userVerifyReducer,
} from "./reducers/UserReducers";
import { 
  amIFollowedByReducer, 
  amIFollowingReducer, 
  followTargetReducer, 
  getFollowedUsersReducer, 
  getTargetFollowersReducer, 
  getUserFollowersReducer, 
  removeFollowerReducer, 
  unfollowTargetReducer 
} from "./reducers/FollowsReducers";
import { 
  getPostLikesReducer, 
  likePostReducer, 
  unlikePostReducer 
} from "./reducers/LikeReducers";
import { 
  createPostReducer, 
  deletePostReducer, 
  getFeedPostsReducer, 
  getPostReducer, 
  getUserPostsReducer 
} from "./reducers/PostReduces";
import { 
  getGameOddsReducer, 
  getLeaguesReducer, 
  getOddsReducer, 
  getPlayerReducer, 
  getPropBetsReducer, 
  getScheduleReducer, 
  getTeamPlayersReducer, 
  getTeamReducer, 
  getTeamScheduleReducer, 
  getTeamStatsReducer, 
  getTeamsReducer, 
  getUpcomingMatchupsReducer 
} from "./reducers/SportsReducers";
import { getCryptoNewsReducer, getLatestNewsReducer, getStocksNewsReducer, searchNewsReducer } from "./reducers/NewsReduscers";
import { getStocksReducer } from "./reducers/StocksReducer";
import { USER_LOGOUT } from "./constants/UserConstants";

const reducers = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userVerify: userVerifyReducer,
  suggestedUsers: suggestedUsersReducer,
  followTarget: followTargetReducer,
  unfollowTarget: unfollowTargetReducer,
  getTargetFollowers: getTargetFollowersReducer,
  getFollowedUsers: getFollowedUsersReducer,
  getUserFollowers: getUserFollowersReducer,
  amIFollowing: amIFollowingReducer,
  amIFollowedBy: amIFollowedByReducer,
  removeFollower: removeFollowerReducer,
  likePost: likePostReducer,
  unlikePost: unlikePostReducer,
  postLikes: getPostLikesReducer,
  createPost: createPostReducer,
  getPost: getPostReducer,
  getUserPosts: getUserPostsReducer,
  deletePost: deletePostReducer,
  getTeams: getTeamsReducer,
  getTeam: getTeamReducer,
  getOdds: getOddsReducer,
  getGameOdds: getGameOddsReducer,
  getTeamStats: getTeamStatsReducer,
  getTeamPlayers: getTeamPlayersReducer,
  getPlayer: getPlayerReducer,
  getTeamSchedule: getTeamScheduleReducer,
  schedules: getScheduleReducer,
  getPropBets: getPropBetsReducer,
  getLeagues: getLeaguesReducer,
  getUpcomingMatchups: getUpcomingMatchupsReducer,
  feedPosts: getFeedPostsReducer,
  latestNews: getLatestNewsReducer,
  cryptoNews: getCryptoNewsReducer,
  stocksNews: getStocksNewsReducer,
  searchNews: searchNewsReducer,
  stocks: getStocksReducer,
});

// Create a root reducer wrapper
const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    state = undefined; // Resets the state
  }
  return reducers(state, action);
};

// LOGIN
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userDetails: {
    userInfo: userInfoFromLocalStorage,
  },
};

const middleware = [thunk];

const actionSanitizer = (action) => {
  switch (action.type) {
    case GET_TEAMS_SUCCESS:
    case GET_ODDS_SUCCESS:
    case GET_TEAM_SUCCESS:
    case GET_TEAM_STATS_SUCCESS:
    case GET_GAME_ODDS_SUCCESS:
    case GET_TEAM_PLAYERS_SUCCESS:
    case GET_PLAYER_SUCCESS:
    case GET_TEAM_SCHEDULE_SUCCESS:
    case GET_PROP_BETS_SUCCESS:
    case GET_LEAGUES_SUCCESS:
      return { ...action, payload: '<<LONG_BLOB>>' };
    default:
      return action;
  }
};

const stateSanitizer = (state) => {
  const sanitizedState = { ...state };
  const keysToSanitize = ['teams', 'odds', 'team', 'stats', 'players', 'player', 'schedules', 'propBets', 'leagues'];

  keysToSanitize.forEach(key => {
    if (sanitizedState[key]) {
      sanitizedState[key] = '<<LONG_BLOB>>';
    }
  });

  return sanitizedState;
};


const enhancer = composeWithDevTools({
  actionSanitizer,
  stateSanitizer
})(applyMiddleware(...middleware));

const store = createStore(
  rootReducer,
  initialState,
  enhancer
);


export default store;