import axios from 'axios';
import {
    GET_STOCKS_FAILURE,
    GET_STOCKS_REQUEST,
    GET_STOCKS_SUCCESS
} from '../constants/StocksConstants';

export const getStocks = (stockCodes) => async (dispatch) => {
    dispatch({ type: GET_STOCKS_REQUEST });
  try {
    const response = await axios.get('https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers', {
        params: {
            tickers: stockCodes.join(','),
            apiKey: process.env.REACT_APP_API_KEY || 'JJW1_GQspRa4RGmIEqS3DKxujvHG3_bv',
        }
    });
    dispatch({ type: GET_STOCKS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_STOCKS_FAILURE, error });
  }
}
