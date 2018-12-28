import React, { Component } from 'react';
import { connect } from 'react-redux';
import StockList from './StockList.jsx';
import DataAttribution from './DataAttribution.jsx';
import { addStock } from '../actions';
import { SYMBOLS_LOADING, SYMBOLS_ERROR } from '../config';

class StockSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchvalue: ''
        };

        this.handleSelectClick = this.handleSelectClick.bind(this);
        this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
    }

    handleSelectClick(event) {
        // Add stock after sanity check
        if (event.target.value.length > 0) {
            this.props.addStock(event.target.value);
        }
      }

    handleSearchValueChange(event) {
        this.setState({searchvalue: event.target.value});
    }

    renderSelect() {
        if (this.props.symbols === SYMBOLS_LOADING) { 
            return <div className="selectform"><p className="pnotification">Loading symbols...</p></div>;
        }
        if (this.props.symbols === SYMBOLS_ERROR) { 
            return <div className="selectform"><p className="perror">Symbols load error (refresh page to reload)</p></div>;
        }

        let selectlist;
        if (this.state.searchvalue.length > 0) {
            const searchLC = this.state.searchvalue.toLowerCase();
            selectlist = this.props.symbols.filter((cur) => cur.searchname.indexOf(searchLC) >= 0);
        } else {
            selectlist = this.props.symbols;
        }

        const renderOptions = () => selectlist.map((cur) => <option key={cur.symbol} value={cur.symbol}>{cur.displayname}</option> );

        return (
            <div className="selectform">
                <form>
                    <label>
                        Search stocks:
                        <input type="text" value={this.state.searchvalue} onChange={this.handleSearchValueChange} />
                    </label>
                    <label>
                        Click on a stock to add to the list ({selectlist.length}):<br />
                        <select size="12" onClick={this.handleSelectClick}>
                            {renderOptions()}
                        </select>
                    </label>
                    <label>
                        <DataAttribution />
                    </label>
                </form>
            </div>
        )
    }


    render() {
        return (
            <div id="stockselect">
                {this.renderSelect()}
                <StockList />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        symbols: state.symbols
    };
}

export default connect(
    mapStateToProps, 
    {addStock}
    )(StockSelect);
