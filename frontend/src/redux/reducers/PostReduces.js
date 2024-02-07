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

export const createPostReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      return { loading: true };
    case CREATE_POST_SUCCESS:
      return { loading: false, post: action.payload };
    case CREATE_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getPostReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case GET_POST_REQUEST:
      return { ...state, loading: true };
    case GET_POST_SUCCESS:
      return { loading: false, post: action.payload };
    case GET_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getUserPostsReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case GET_USER_POSTS_REQUEST:
      return { loading: true };
    case GET_USER_POSTS_SUCCESS:
      return { loading: false, posts: action.payload };
    case GET_USER_POSTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deletePostReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_POST_REQUEST:
      return { loading: true };
    case DELETE_POST_SUCCESS:
      return { loading: false, success: true };
    case DELETE_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getFeedPostsReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case GET_FEED_POSTS_REQUEST:
      return { ...state, loading: true };
    case GET_FEED_POSTS_SUCCESS:
      const newPosts = action.payload;
      const updatedPosts = [...state.posts, ...newPosts].reduce((acc, post) => {
        if (!acc.some(p => p._id === post._id)) {
          acc.push(post);
        }
        return acc;
      }, []);
      return { loading: false, posts: updatedPosts };
    case GET_FEED_POSTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};