import { COOKIE_NAME, COOKIE_EXDAYS, MAX_STOCKS } from '../config';
import { setCookie } from '../utils/cookie';

const stocksReducer = (stocks=[], action) => {
    if (action.type === 'ADD_STOCK') {
        // Add stock symbol to state if there is room and
        // if the symbol is not there already
        if ((stocks.length < MAX_STOCKS) &&
            (stocks.indexOf(action.payload) === -1)) {
                const newstocks = [...stocks, action.payload].sort();
                setCookie(COOKIE_NAME, JSON.stringify(newstocks), COOKIE_EXDAYS);
                return newstocks;
        }
    }

    if (action.type === 'REMOVE_STOCK') {
        // Remove stock symbol from state
        const newstocks = stocks.filter(item => item !== action.payload);
        setCookie(COOKIE_NAME, JSON.stringify(newstocks), COOKIE_EXDAYS);
        return newstocks;
    }

    return stocks;
}

export default stocksReducer;
