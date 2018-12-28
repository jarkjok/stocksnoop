import axios from 'axios';
import { urlSymbols, urlStockData } from '../api';

export const getMarketData = (symbol) => async (dispatch) => {
    const response = await axios.get(urlStockData(symbol))  // same url as for stocks
        .then(resp => resp.data)
        .catch(error => error);
    dispatch({
        type: 'GET_MARKET_DATA',
        payload: {
            symbol: symbol,
            data: response
        }
    });
}

export const getSymbols = () => async (dispatch) => {
    const response = await axios.get(urlSymbols())
        .then(resp => resp.data)
        .catch(error => error);
    dispatch({
        type: 'GET_SYMBOLS',
        payload: response
    });
}

export const addStock = (symbol) => async (dispatch) => {
    // Initiate stock data get
    dispatch(getStockData(symbol));

    dispatch({
        type: 'ADD_STOCK',
        payload: symbol
    });
}

export const removeStock = (symbol) => {
    return ({
        type: 'REMOVE_STOCK',
        payload: symbol
    });
}

export const getStockData = (symbol) => async (dispatch) => {
    const response = await axios.get(urlStockData(symbol))
        .then(resp => resp.data)
        .catch(error => error);
    dispatch({
        type: 'GET_STOCK_DATA',
        payload: {
            symbol: symbol,
            data: response
        }
    });
}

export const setPeriod = (label) => {
    return ({
        type: 'SET_PERIOD',
        payload: label
    });
}

export const setGraph = (label) => {
    return ({
        type: 'SET_GRAPH',
        payload: label
    });
}
