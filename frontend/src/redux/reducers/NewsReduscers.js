import {
  GET_NEWS_FAILURE,
  GET_NEWS_REQUEST,
  GET_NEWS_SUCCESS,
  GET_CRYPTO_NEWS_REQUEST,
  GET_CRYPTO_NEWS_SUCCESS,
  GET_CRYPTO_NEWS_FAILURE,
  GET_STOCKS_NEWS_REQUEST,
  GET_STOCKS_NEWS_SUCCESS,
  GET_STOCKS_NEWS_FAILURE,
  SEARCH_NEWS_REQUEST,
  SEARCH_NEWS_SUCCESS,
  SEARCH_NEWS_FAILURE,
} from "../constants/NewsConstants";

export const getLatestNewsReducer = (state = { latest: [] }, action) => {
  switch (action.type) {
    case GET_NEWS_REQUEST:
      return { loading: true };
    case GET_NEWS_SUCCESS:
      return { loading: false, latest: action.payload };
    case GET_NEWS_FAILURE:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};

export const getCryptoNewsReducer = (state = { crypto: [] }, action) => {
  switch (action.type) {
    case GET_CRYPTO_NEWS_REQUEST:
      return { loading: true };
    case GET_CRYPTO_NEWS_SUCCESS:
      return { loading: false, crypto: action.payload };
    case GET_CRYPTO_NEWS_FAILURE:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};

export const getStocksNewsReducer = (state = { stocks: [] }, action) => {
  switch (action.type) {
    case GET_STOCKS_NEWS_REQUEST:
      return { loading: true };
    case GET_STOCKS_NEWS_SUCCESS:
      return { loading: false, stocks: action.payload };
    case GET_STOCKS_NEWS_FAILURE:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};

export const searchNewsReducer = (state = { search: [] }, action) => {
  switch (action.type) {
    case SEARCH_NEWS_REQUEST:
      return { loading: true };
    case SEARCH_NEWS_SUCCESS:
      return { loading: false, search: action.payload };
    case SEARCH_NEWS_FAILURE:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};