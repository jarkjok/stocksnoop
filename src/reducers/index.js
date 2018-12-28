import { combineReducers } from 'redux';
import marketdataReducer from './marketdataReducer';
import symbolsReducer from './symbolsReducer';
import stocksReducer from './stocksReducer';
import stockdataReducer from './stockdataReducer';
import periodReducer from './periodReducer';
import graphReducer from './graphReducer';

export default combineReducers ({
    marketdata: marketdataReducer,
    symbols: symbolsReducer,
    stocks: stocksReducer,
    stockdata: stockdataReducer,
    period: periodReducer,
    graph: graphReducer
});
