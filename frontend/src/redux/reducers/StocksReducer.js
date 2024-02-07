import {
    GET_STOCKS_REQUEST,
    GET_STOCKS_SUCCESS,
    GET_STOCKS_FAILURE,
} from '../constants/StocksConstants';

export const getStocksReducer = (state = { stocks: [] }, action) => {
    switch (action.type) {
        case GET_STOCKS_REQUEST:
            return { loading: true };
        case GET_STOCKS_SUCCESS:
            return { loading: false, stocks: action.payload.tickers };
        case GET_STOCKS_FAILURE:
            return { loading: false, error: action.error };
        default:
            return state;
    }
};
