import React from 'react';

import '../../node_modules/react-vis/dist/style.css';
import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    LineSeries,
    Crosshair
  } from 'react-vis';

class TimeSeriesPlot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          chValues: []
        };
    }

    // Empty plot
    emptyPlot = (loading) => {
        const emptyclass = loading ? "rv-xy-plot-loading" : "rv-xy-plot";
        let empty = [{ date: new Date() }];
        (empty[0])[this.props.series] = 0;
        return (
            <XYPlot className={emptyclass} width={900} height={600} xType="time" yDomain={[0,1]}>
                <HorizontalGridLines />
                <XAxis />
                <YAxis title={this.props.ytitle} />
                <LineSeries data={this.tsToXYPlot(empty, this.props.series)} />
            </XYPlot>
        )
    };

    // Time series data to xy plot format
    tsToXYPlot = (tsdata, label) =>
        (tsdata === null) ? null : tsdata.map(cur => ({x: cur.date, y: cur[label]}));

    onMouseLeave = () => {
        // Clear crosshair
        this.setState({chValues: []});
    };

    onNearestX = (value) => {
        const xDate = value.x.valueOf();
        const crossvalues = this.props.data.map(cur => {
            const chvalue = cur.find(d => d.date.valueOf() === xDate);
            if (chvalue !== undefined) {
                return { x: value.x, y: chvalue[this.props.series] };
            } else {
                return { x: value.x, y: undefined };
            }
        });
        this.setState({
            chValues: crossvalues
        });
    };

    renderLines = () => this.props.data.map((cur, idx) => 
        <LineSeries
            key={idx}
            data={this.tsToXYPlot(cur, this.props.series)}
            onNearestX={idx === 0 ? this.onNearestX : null}
            strokeWidth={idx === 0 ? 2.5 : 1.5}
        />
    );

    chTitleFormat = (dp) => ({
        title: 'Date',
        value: new Date(dp[0].x).toLocaleDateString()
    });

    chItemsFormat = (dp) => dp.map((cur, idx) => ({
        title: `${this.props.titles[idx]} `,
        value: (cur.y !== undefined) ? `${this.props.yprefix}${cur.y.toFixed(2)}` : "n/a"
    }));

    render() {
        if ((!this.props.titles) || (this.props.titles.length === 0)) {
            // No titles, empty plot
            return this.emptyPlot(false);
        }

        if ((this.props.titles.reduce((acc, cur, idx) => (acc && (this.props.data[idx].length > 0)) ? false : acc, true))) {
            // Titles but no data, empty plot with loading text
            return this.emptyPlot(true);
        }

        return (
            <XYPlot width={900} height={600} xType="time" onMouseLeave={this.onMouseLeave}>
                <HorizontalGridLines />
                <XAxis />
                <YAxis title={this.props.ytitle} />
                {this.renderLines()}
                <Crosshair
                    values={this.state.chValues}
                    titleFormat={this.chTitleFormat}
                    itemsFormat={this.chItemsFormat} />
            </XYPlot>
        );
    }
}

export default TimeSeriesPlot;
