const stockdataReducer = (stockdata={}, action) => {
    if (action.type === 'GET_STOCK_DATA') {
        if (action.payload.data instanceof Error) {
            // Error in data fetch, do not change stockdata
            // TODO: Better error handling
            return stockdata;
        } else {
            let newstockdata = Object.assign({}, stockdata);
            // Leave only date (as Date.valueOf) and close price
            newstockdata[action.payload.symbol] = action.payload.data.map((cur) =>
                { return {datevalue: (new Date(cur.date)).valueOf(), close: cur.close}; } );
            return newstockdata;
        }
    }

    if (action.type === 'REMOVE_STOCK') {
        // Remove stock data from state
        let newstockdata = Object.assign({}, stockdata);
        delete newstockdata[action.payload];
        return newstockdata;
    }

    return stockdata;
}

export default stockdataReducer;
