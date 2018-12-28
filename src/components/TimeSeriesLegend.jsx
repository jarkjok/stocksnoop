import React from 'react';

import '../../node_modules/react-vis/dist/style.css';
import { DiscreteColorLegend } from 'react-vis';

const TimeSeriesLegend = ({titles}) => {
    if ((!titles) || (titles.length === 0)) {
        return <DiscreteColorLegend items={[]} />;
    }

    const items = titles.map((cur, idx) => ({
        title: cur,
        strokeWidth: (idx === 0) ? 2.5 : 1.5
    }));

    return <DiscreteColorLegend items={items}  />;
}

export default TimeSeriesLegend;
