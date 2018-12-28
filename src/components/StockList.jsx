import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeStock } from '../actions';
import { SYMBOLS_LOADING, SYMBOLS_ERROR, MAX_STOCKS } from '../config';

class StockList extends Component {
    handleRemove(symbol) {
        this.props.removeStock(symbol);
    }

    renderStockList() {
        if ((!this.props.stocks) || (this.props.stocks.length === 0)) {
            return <span>Select stocks from the list above</span>;
        }

        return (
            <table>
                <tbody>
                    {this.renderStockTable()}
                </tbody>
            </table>
        );
    }

    renderStockTable() {
        // If ongoing API request for symbols, do not display names
        const loading = (this.props.symbols === SYMBOLS_LOADING) ||
                        (this.props.symbols === SYMBOLS_ERROR) ||
                        (this.props.symbols.length === 0) ? true : false;
        const findstockname = (symbol) => {
            const stock = this.props.symbols.find(x => x.symbol === symbol);
            return (stock === undefined ? "n/a" : stock.name);
        };

        const stocklist = this.props.stocks.map(symbol => ({
            symbol: symbol,
            name: loading ? "n/a" : findstockname(symbol)
            } ));

        return stocklist.map(stock => 
            <tr key={stock.symbol}>
                <th>{stock.symbol}</th>
                <td>{stock.name}</td>
                <td onClick={() => this.handleRemove(stock.symbol)} className="removetext">Remove</td>
            </tr>
        )
    }

    render() {
        const maxNotification = (this.props.stocks.length < MAX_STOCKS) ? '' :
            <p className="pnotification">Maximum amount selected, remove stocks to add new ones</p>;

        return (
            <div className="stocklist">
                {this.renderStockList()}
                {maxNotification}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        symbols: state.symbols,
        stocks: state.stocks
    };
}

export default connect(
    mapStateToProps, 
    {removeStock}
    )(StockList);
