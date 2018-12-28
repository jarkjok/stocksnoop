// Value of date object
export const addDateValueToChart = (chart) => chart.map(cur => {
    let obj = Object.assign({}, cur);
    obj.datevalue = cur.date.valueOf();
    return obj;
});

// Graph transformation functions

// Close price
export const closePrice = (chart) => chart.map(cur => ({ date: cur.date, close: cur.close }));

// Close price to cumulative return
export const closePriceToCumReturn = (chart) => {
    const first = chart.findIndex(x => x.close !== undefined);
    if (first > -1) {
        return chart.map((cur, idx, array) => (idx < first) ? { date: cur.date, cumr: undefined } :
            ((idx > first) ? { date: cur.date, cumr: (cur.close / array[first].close) } : { date: cur.date, cumr: 1 })
        );
    } else {
        return chart.map(cur => ({ date: cur.date, cumr: undefined }));
    }
}
