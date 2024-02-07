import {
  FOLLOW_TARGET_REQUEST,
  FOLLOW_TARGET_SUCCESS,
  FOLLOW_TARGET_FAIL,
  UNFOLLOW_TARGET_REQUEST,
  UNFOLLOW_TARGET_SUCCESS,
  UNFOLLOW_TARGET_FAIL,
  GET_TARGET_FOLLOWERS_REQUEST,
  GET_TARGET_FOLLOWERS_SUCCESS,
  GET_TARGET_FOLLOWERS_FAIL,
  GET_FOLLOWED_USERS_REQUEST,
  GET_FOLLOWED_USERS_SUCCESS,
  GET_FOLLOWED_USERS_FAIL,
  GET_USER_FOLLOWERS_REQUEST,
  GET_USER_FOLLOWERS_SUCCESS,
  GET_USER_FOLLOWERS_FAIL,
  AM_I_FOLLOWING_REQUEST,
  AM_I_FOLLOWING_SUCCESS,
  AM_I_FOLLOWING_FAIL,
  AM_I_FOLLOWED_BY_REQUEST,
  AM_I_FOLLOWED_BY_SUCCESS,
  AM_I_FOLLOWED_BY_FAIL,
  REMOVE_FOLLOWER_REQUEST,
  REMOVE_FOLLOWER_SUCCESS,
  REMOVE_FOLLOWER_FAIL,
} from '../constants/FollowsConstants.js';

export const followTargetReducer = (state = {}, action) => {
  switch (action.type) {
    case FOLLOW_TARGET_REQUEST:
      return { loading: true };
    case FOLLOW_TARGET_SUCCESS:
      return { loading: false, success: true, follow: action.payload };
    case FOLLOW_TARGET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const unfollowTargetReducer = (state = {}, action) => {
  switch (action.type) {
    case UNFOLLOW_TARGET_REQUEST:
      return { loading: true };
    case UNFOLLOW_TARGET_SUCCESS:
      return { loading: false, success: true };
    case UNFOLLOW_TARGET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getTargetFollowersReducer = (state = { followers: [] }, action) => {
  switch (action.type) {
    case GET_TARGET_FOLLOWERS_REQUEST:
      return { loading: true };
    case GET_TARGET_FOLLOWERS_SUCCESS:
      return { loading: false, followers: action.payload };
    case GET_TARGET_FOLLOWERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getFollowedUsersReducer = (state = { followedUsers: [] }, action) => {
  switch (action.type) {
    case GET_FOLLOWED_USERS_REQUEST:
      return { loading: true };
    case GET_FOLLOWED_USERS_SUCCESS:
      return { loading: false, followedUsers: action.payload };
    case GET_FOLLOWED_USERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getUserFollowersReducer = (state = { userFollowers: [] }, action) => {
  switch (action.type) {
    case GET_USER_FOLLOWERS_REQUEST:
      return { loading: true };
    case GET_USER_FOLLOWERS_SUCCESS:
      return { loading: false, userFollowers: action.payload };
    case GET_USER_FOLLOWERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const amIFollowingReducer = (state = {}, action) => {
  switch (action.type) {
    case AM_I_FOLLOWING_REQUEST:
      return { loading: true };
    case AM_I_FOLLOWING_SUCCESS:
      return { loading: false, amIFollowing: action.payload.amIFollowing };
    case AM_I_FOLLOWING_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const amIFollowedByReducer = (state = {}, action) => {
  switch (action.type) {
    case AM_I_FOLLOWED_BY_REQUEST:
      return { loading: true };
    case AM_I_FOLLOWED_BY_SUCCESS:
      return { loading: false, amIFollowedBy: action.payload.amIFollowedBy };
    case AM_I_FOLLOWED_BY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const removeFollowerReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_FOLLOWER_REQUEST:
      return { loading: true };
    case REMOVE_FOLLOWER_SUCCESS:
      return { loading: false, success: true };
    case REMOVE_FOLLOWER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

