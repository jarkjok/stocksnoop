import React from 'react';
import { connect } from 'react-redux';
import { MARKET_NAME } from '../config';
import TimeSeriesGraph from './TimeSeriesGraph.jsx';
import PeriodSelect from './PeriodSelect.jsx';
import GraphSelect from './GraphSelect.jsx';

class StockPerformance extends React.Component {
    prepareData = (graph, marketdata, stocks, stockdata) => {
        const plotnames = [MARKET_NAME].concat(stocks);
        let plotdata = plotnames.map(x => []);  // empty plot if no market data

        if (marketdata.length > 0) {
            // Use market data as the time series reference
            const market = marketdata.slice(Math.max((marketdata.length - this.props.period.days), 0));
            plotdata = plotnames.map((cur, idx) => {
                let plot = [];
                if (idx === 0) {
                    // Market data
                    plot = graph.transform(market);
                } else {
                    // Stock data
                    if (stockdata[cur] !== undefined) {
                        const stockdates = stockdata[cur].map(x => x.datevalue);
                        const index = market.map(x => stockdates.indexOf(x.datevalue));
                        plot = market.map((elem, idx) => (index[idx] > -1) ?
                            { date: elem.date, close: (stockdata[cur])[index[idx]].close } :
                            { date: elem.date, close: undefined });
                        plot = graph.transform(plot);
                    }
                }
                // Remove undefined and NaN values
                plot = plot.filter(elem => (elem[graph.label] !== undefined) && (!isNaN(elem[graph.label])));
                return plot;
            });
        }

        // Return an object containing
        // * names: plot (legend) names of the data series
        // * data: an array of the time series arrays in the same order as the plot names
        return ({
            names: plotnames,
            data: plotdata
        });
    }

    render() {
        const plotdata = this.prepareData(this.props.graph, this.props.marketdata, this.props.stocks, this.props.stockdata);
        return (
            <div id="stockperformance">
                <TimeSeriesGraph
                    titles={plotdata.names}
                    data={plotdata.data}
                    series={this.props.graph.label}
                    ytitle={this.props.graph.displaytext}
                    yprefix={this.props.graph.currency} />
                <GraphSelect />
                <PeriodSelect />
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        marketdata: state.marketdata,
        stocks: state.stocks,
        stockdata: state.stockdata,
        period: state.period,
        graph: state.graph
    };
}

export default connect(
    mapStateToProps, 
    null
    )(StockPerformance);
