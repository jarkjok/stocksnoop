import { PERIODS } from '../config';

const periodReducer = (period=PERIODS[0], action) => {
    if (action.type === 'SET_PERIOD') {
        // Set state only if argument is one of the labels in the PERIODS array
        const index = PERIODS.map(cur => cur.label).indexOf(action.payload);
        if (index > -1) {
            return PERIODS[index];
        }
    }

    return period;
}

export default periodReducer;
