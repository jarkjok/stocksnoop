import React from 'react';
import { connect } from 'react-redux';
import { PERIODS } from '../config';
import { setPeriod } from '../actions';

const PeriodSelect = (props) => {
    return (
        <div className="periodselect">
            {PERIODS.map(cur => <button
                key={cur.label}
                className={(cur.label === props.period.label) ? "button-selected" : "button-not-selected"}
                onClick={() => props.setPeriod(cur.label)}>{cur.label}</button>)}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        period: state.period
    };
}

export default connect(
    mapStateToProps, 
    { setPeriod }
    )(PeriodSelect);
