import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { getCookie, setCookie } from '../utils/cookie.js';
import { COOKIE_NAME, COOKIE_EXDAYS, MARKET_SYMBOL, DEFAULT_STOCK_SYMBOLS } from '../config';
import { getMarketData, getSymbols, addStock } from '../actions';
import Navigation from './Navigation.jsx';
import StockSelect from './StockSelect.jsx';
import StockPerformance from './StockPerformance.jsx';

import './App.css';

class App extends React.Component {

  componentDidMount() {
    // Get market reference data
    this.props.getMarketData(MARKET_SYMBOL);
  
    // Stock selections
    const cookie = getCookie(COOKIE_NAME);
    if (cookie.length === 0) {
      // Cookie is not set or has expired, use default stocks
      setCookie(COOKIE_NAME, JSON.stringify(DEFAULT_STOCK_SYMBOLS), COOKIE_EXDAYS);
      DEFAULT_STOCK_SYMBOLS.map((item) => this.props.addStock(item));
    } else {
      JSON.parse(cookie).map((item) => this.props.addStock(item));
    }

    // Get symbol list
    this.props.getSymbols();
  }

  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Navigation />
        <Route path="/" exact={true} component={StockPerformance} />
        <Route path="/select" component={StockSelect} />
      </div>
    </BrowserRouter>
    );
  }
}

export default connect(
  null,
  { getMarketData,
    getSymbols,
    addStock }
)(App);
