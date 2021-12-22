import axios from 'axios';
const ROOT_URL = `https://data.covid19india.org/v4/min/`;


export const BASIC_STAT = 'BASIC_STAT';
export const TIMELINE_STAT = 'TIMELINE_STAT';
export const BasicStat = () => async (dispatch) => {

    const url = `${ROOT_URL}/data.min.json`;

    const payload = await axios.get(url);
    dispatch({
        type: BASIC_STAT,
        payload: payload
    });
}
export const timelineState = () => async (dispatch) => {

    const url = `${ROOT_URL}/timeseries.min.json`;

    const payload = await axios.get(url);
    dispatch({
        type: TIMELINE_STAT,
        payload: payload
    });
}
