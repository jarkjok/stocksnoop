import { addDateValueToChart } from '../utils/stats';

const marketdataReducer = (marketdata=[], action) => {
    if (action.type === 'GET_MARKET_DATA') {
        if (action.payload.data instanceof Error) {
            // Error in data fetch, do not change marketdata
            // TODO: Better error handling
            return marketdata;
        } else {
            // Leave only date (as Date object) and close price,
            // add date value
            return addDateValueToChart(action.payload.data.map(cur =>
                ({date: new Date(cur.date), close: cur.close})));
        }
    }

    return marketdata;
}

export default marketdataReducer;
