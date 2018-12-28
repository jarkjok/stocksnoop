import { closePrice, closePriceToCumReturn } from '../utils/stats';

// Cookie
export const COOKIE_NAME = "stocksnoopStocks";
export const COOKIE_EXDAYS = 365;

// Market reference definitions
export const MARKET_SYMBOL = "IVV";  // iShares Core S&P 500 ETF
export const MARKET_NAME = "S&P500";

// State for symbols during api request
export const SYMBOLS_LOADING = "LOADING";
export const SYMBOLS_ERROR = "ERROR";

// Stock definitions
export const DEFAULT_STOCK_SYMBOLS = [ "AMZN", "FB", "GOOGL", "NFLX" ];  // FANG
export const MAX_STOCKS = 8;

// Statistics and graph time periods
export const PERIODS = [
    { label: "5Y", days: 1260 },
    { label: "3Y", days: 756  },
    { label: "1Y", days: 252  },
    { label: "6M", days: 126  },
    { label: "3M", days: 63   },
    { label: "1M", days: 21   }
];

// Graph properties
export const GRAPHS = [
    { label: "cumr",
      displaytext: "Cumulative return",
      transform: closePriceToCumReturn,
      currency: ''
     },
     { label: "close",
     displaytext: "Close price",
     transform: closePrice,
     currency: '$'
   }
];
