import axios from 'axios';
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
  GET_USER_FRIENDS_DATA_REQUEST,
  GET_USER_FRIENDS_DATA_SUCCESS,
  GET_USER_FRIENDS_DATA_FAIL,
} from '../constants/FollowsConstants.js';
import { URL } from "../Url";

// Follow Target
export const followTarget = (followerId, followedId) => async (dispatch) => {
  try {
    dispatch({ type: FOLLOW_TARGET_REQUEST });

    const { data } = await axios.post(`${URL}/api/follows/followTarget`, { followerId, followedId });

    dispatch({ type: FOLLOW_TARGET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FOLLOW_TARGET_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Unfollow Target
export const unfollowTarget = (followerId, followedId) => async (dispatch) => {
  try {
    dispatch({ type: UNFOLLOW_TARGET_REQUEST });

    const { data } = await axios.delete(`${URL}/api/follows/unfollowTarget`, { data: { followerId, followedId } });

    dispatch({ type: UNFOLLOW_TARGET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UNFOLLOW_TARGET_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Get Target Followers
export const getTargetFollowers = (targetId) => async (dispatch) => {
  try {
    dispatch({ type: GET_TARGET_FOLLOWERS_REQUEST });

    const { data } = await axios.get(`${URL}/api/follows/getTargetFollowers/${targetId}`);

    dispatch({ type: GET_TARGET_FOLLOWERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_TARGET_FOLLOWERS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Get User Friends Data
export const getUserFriends = (userId) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_FRIENDS_DATA_REQUEST });

    const { data } = await axios.get(`${URL}/api/follows/getUserFriends/${userId}`);

    dispatch({ type: GET_USER_FRIENDS_DATA_SUCCESS, payload: data });
    return data
  } catch (error) {
    dispatch({
      type: GET_USER_FRIENDS_DATA_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Get Followed Users
export const getFollowedUsers = (userId) => async (dispatch) => {
  try {
    dispatch({ type: GET_FOLLOWED_USERS_REQUEST });

    const { data } = await axios.get(`${URL}/api/follows/getFollowedUsers/${userId}`);

    dispatch({ type: GET_FOLLOWED_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_FOLLOWED_USERS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Get User Followers
export const getUserFollowers = (userId) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_FOLLOWERS_REQUEST });

    const { data } = await axios.get(`${URL}/api/follows/getUserFollowers/${userId}`);

    dispatch({ type: GET_USER_FOLLOWERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_FOLLOWERS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Check if I am following another user
export const amIFollowing = (myId, targetUserId) => async (dispatch) => {
  try {
    dispatch({ type: AM_I_FOLLOWING_REQUEST });

    const { data } = await axios.get(`${URL}/api/follows/amIFollowing/${myId}/${targetUserId}`);

    dispatch({ type: AM_I_FOLLOWING_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({
      type: AM_I_FOLLOWING_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Check if I am followed by another user
export const amIFollowedBy = (myId, targetUserId) => async (dispatch) => {
  try {
    dispatch({ type: AM_I_FOLLOWED_BY_REQUEST });

    const { data } = await axios.get(`${URL}/api/follows/amIFollowedBy/${myId}/${targetUserId}`);

    dispatch({ type: AM_I_FOLLOWED_BY_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({
      type: AM_I_FOLLOWED_BY_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Remove a follower
export const removeFollower = (followerId) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_FOLLOWER_REQUEST });

    const { data } = await axios.delete(`${URL}/api/follows/removeFollower/${followerId}`);

    dispatch({ type: REMOVE_FOLLOWER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REMOVE_FOLLOWER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

