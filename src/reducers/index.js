import { combineReducers } from 'redux';

import stats from './stats';
export default combineReducers({
    API_DATA: stats
});