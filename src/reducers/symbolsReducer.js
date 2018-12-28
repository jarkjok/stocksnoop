import { SYMBOLS_LOADING, SYMBOLS_ERROR } from '../config';

const symbolsReducer = (symbols=SYMBOLS_LOADING, action) => {
    if (action.type === 'GET_SYMBOLS') {
        if (action.payload instanceof Error) {
            // Error in symbol request
            return SYMBOLS_ERROR;
        } else {
            // Only common stocks ('cs') that are enabled for trading
            const cs = action.payload.filter(elem => (elem.type === "cs") && elem.isEnabled );
            // Remove duplicates and empty symbols
            const uniquecs = cs.filter((elem, idx) => (cs.indexOf(elem) === idx) && (elem.symbol.length > 0));

            // Add display name and search name (lower case)
            return uniquecs.map((cur) => ({
                symbol: cur.symbol,
                name: cur.name,
                displayname: `${cur.symbol} (${cur.name})`,
                searchname: `${cur.symbol.toLowerCase()} ${cur.name.toLowerCase()}`
            }));
        }
    }

    return symbols;
}

export default symbolsReducer;
