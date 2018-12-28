import { GRAPHS } from '../config';

const graphReducer = (graph=GRAPHS[0], action) => {
    if (action.type === 'SET_GRAPH') {
        // Set state only if argument is one of the labels in the GRAPHS array
        const index = GRAPHS.map(cur => cur.label).indexOf(action.payload);
        if (index > -1) {
            return GRAPHS[index];
        }
    }

    return graph;
}

export default graphReducer;
