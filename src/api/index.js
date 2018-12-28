const URL_ROOT = 'https://api.iextrading.com/1.0';

export const urlStockData = (symbol) => `${URL_ROOT}/stock/${symbol}/chart/5y`;
export const urlSymbols = () => `${URL_ROOT}/ref-data/symbols`;
