import axios from 'axios';
import { URL } from "../Url";
import {
  GET_POST_LIKES_FAIL,
  GET_POST_LIKES_REQUEST,
  GET_POST_LIKES_SUCCESS,
  LIKE_POST_FAIL,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  UNLIKE_POST_FAIL,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  IS_LIKED_REQUEST,
  IS_LIKED_SUCCESS,
  IS_LIKED_FAIL
} from '../constants/LikeConstants';

// Like a post
export const likePost = (postId, userId) => async (dispatch) => {
  try {
    dispatch({ type: LIKE_POST_REQUEST });

    const { data } = await axios.post(`${URL}/api/like/like/${postId}`, { userId });

    dispatch({ type: LIKE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LIKE_POST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Unlike a post
export const unlikePost = (postId, userId) => async (dispatch) => {
  try {
    dispatch({ type: UNLIKE_POST_REQUEST });

    const { data } = await axios.delete(`${URL}/api/like/unlike/${postId}`, { data: { userId } });

    dispatch({ type: UNLIKE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UNLIKE_POST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Get likes for a post
export const getPostLikes = (postId, userId) => async (dispatch) => {
  try {
    dispatch({ type: GET_POST_LIKES_REQUEST });

    const { data } = await axios.get(`${URL}/api/like/likes/${postId}`, {
      params: {
        userId: userId,
      }
    });

    dispatch({ type: GET_POST_LIKES_SUCCESS, payload: data });
    return data
  } catch (error) {
    dispatch({
      type: GET_POST_LIKES_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};