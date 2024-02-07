import axios from "axios";
import { URL } from "../Url";
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

export const getLatestNews = () => async dispatch => {
  dispatch({ type: GET_NEWS_REQUEST });
  try {
    const response = await axios.get(`${URL}/api/news/latest-news`);
    dispatch({ type: GET_NEWS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_NEWS_FAILURE, error });
  }
};

export const getCryptoNews = () => async dispatch => {
  dispatch({ type: GET_CRYPTO_NEWS_REQUEST });
  try {
    const response = await axios.get(`${URL}/api/news/crypto-news`);
    dispatch({ type: GET_CRYPTO_NEWS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_CRYPTO_NEWS_FAILURE, error });
  }
};

export const getStocksNews = () => async dispatch => {
  dispatch({ type: GET_STOCKS_NEWS_REQUEST });
  try {
    const response = await axios.get(`${URL}/api/news/stocks-news`);
    dispatch({ type: GET_STOCKS_NEWS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_STOCKS_NEWS_FAILURE, error });
  }
};

export const searchNews = (topic) => async dispatch => {
  dispatch({ type: SEARCH_NEWS_REQUEST });
  try {
    const response = await axios.get(`${URL}/api/news/search`, {
      params: {
        topic: topic,
      }
    });
    dispatch({ type: SEARCH_NEWS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: SEARCH_NEWS_FAILURE, error });
  }
};