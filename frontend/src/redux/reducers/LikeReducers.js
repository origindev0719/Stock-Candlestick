import { GET_POST_LIKES_FAIL, GET_POST_LIKES_REQUEST, GET_POST_LIKES_SUCCESS, LIKE_POST_FAIL, LIKE_POST_REQUEST, LIKE_POST_SUCCESS, UNLIKE_POST_FAIL, UNLIKE_POST_REQUEST, UNLIKE_POST_SUCCESS } from "../constants/LikeConstants";

const likePostReducer = (state = {}, action) => {
  switch (action.type) {
    case LIKE_POST_REQUEST:
      return { loading: true };
    case LIKE_POST_SUCCESS:
      return { loading: false, success: true };
    case LIKE_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const unlikePostReducer = (state = {}, action) => {
  switch (action.type) {
    case UNLIKE_POST_REQUEST:
      return { loading: true };
    case UNLIKE_POST_SUCCESS:
      return { loading: false, success: true };
    case UNLIKE_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const getPostLikesReducer = (state = { }, action) => {
  switch (action.type) {
    case GET_POST_LIKES_REQUEST:
      return { loading: true };
    case GET_POST_LIKES_SUCCESS:
      return { loading: false, likes: action.payload };
    case GET_POST_LIKES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export { likePostReducer, unlikePostReducer, getPostLikesReducer };
