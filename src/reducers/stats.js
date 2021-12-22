import { BASIC_STAT, TIMELINE_STAT } from '../actions';
export default function (state = [], action) {
    switch (action.type) {
        case BASIC_STAT:
            // return [action.payload.data];
            return { ...state, ...{ [BASIC_STAT]: action.payload.data } };
        case TIMELINE_STAT:
            // return [action.payload.data];
            return { ...state, ...{ [TIMELINE_STAT]: action.payload.data } };
        default: return state;
    }
}