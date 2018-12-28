import React from 'react';
import TimeSeriesPlot from './TimeSeriesPlot.jsx';
import TimeSeriesLegend from './TimeSeriesLegend.jsx';
import DataAttribution from './DataAttribution.jsx';

const TimeSeriesGraph = (props) => {
    return (
        <div className="timeseriesgraph">
            <TimeSeriesPlot
                titles={props.titles}
                data={props.data}
                series={props.series}
                ytitle={props.ytitle}
                yprefix={props.yprefix} />
            <TimeSeriesLegend
                titles={props.titles} />
            <div style={{paddingTop: 6}}>
                <DataAttribution />
            </div>
        </div>
    )
}

export default TimeSeriesGraph;
