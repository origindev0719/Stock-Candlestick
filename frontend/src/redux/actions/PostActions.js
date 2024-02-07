import axios from 'axios';
import { URL } from "../Url";
import { 
  CREATE_POST_FAIL, 
  CREATE_POST_REQUEST, 
  CREATE_POST_SUCCESS, 
  DELETE_POST_FAIL, 
  DELETE_POST_REQUEST, 
  DELETE_POST_SUCCESS, 
  GET_POST_FAIL, 
  GET_POST_REQUEST, 
  GET_POST_SUCCESS, 
  GET_USER_POSTS_FAIL, 
  GET_USER_POSTS_REQUEST, 
  GET_USER_POSTS_SUCCESS,
  GET_FEED_POSTS_FAIL, 
  GET_FEED_POSTS_REQUEST, 
  GET_FEED_POSTS_SUCCESS 
} from '../constants/PostConstants';

// Create a post
export const createPost = (text, image, userId) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_POST_REQUEST });

    const formData = new FormData();
    formData.append('text', text);
    formData.append('userId', userId);
    if (image) {
      formData.append('image', image);
    }

    const { data } = await axios.post(`${URL}/api/post/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    dispatch({ type: CREATE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_POST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};


// Get a specific post by ID
export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_POST_REQUEST });

    const { data } = await axios.get(`${URL}/api/post/${id}`);

    dispatch({ type: GET_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_POST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Get all posts by a specific user
export const getUserPosts = (userId) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_POSTS_REQUEST });

    const { data } = await axios.get(`${URL}/api/post/user/${userId}`);

    dispatch({ type: GET_USER_POSTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_POSTS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Remove a post
export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_POST_REQUEST });

    await axios.delete(`${URL}/api/post/${id}`);

    dispatch({ type: DELETE_POST_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_POST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Get feed posts
export const getFeedPosts = (userId, page, limit) => async (dispatch) => {
  try {
    dispatch({ type: GET_FEED_POSTS_REQUEST });

    const { data } = await axios.get(`${URL}/api/post/feed/${userId}?page=${page}&limit=${limit}`);

    dispatch({ type: GET_FEED_POSTS_SUCCESS, payload: data });
    return data
  } catch (error) {
    dispatch({
      type: GET_FEED_POSTS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};