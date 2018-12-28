import React from 'react';
import { connect } from 'react-redux';
import { GRAPHS } from '../config';
import { setGraph } from '../actions';

const GraphSelect = (props) => {
    return (
        <div className="graphselect">
            {GRAPHS.map(cur => <button
                key={cur.label}
                className={(cur.label === props.graph.label) ? "button-selected" : "button-not-selected"}
                onClick={() => props.setGraph(cur.label)}>{cur.displaytext}</button>)}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        graph: state.graph
    };
}

export default connect(
    mapStateToProps, 
    { setGraph }
    )(GraphSelect);
