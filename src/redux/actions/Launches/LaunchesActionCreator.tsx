import {SET_QUERY_LAUNCHES} from '../Launches/LaunchesActionTypes';

export const setLaunchesQuery = (query: any) => {
    console.log("Dispatching launch action creator, payload is ", query);
    return {
        type: SET_QUERY_LAUNCHES,
        payload: query
    }
}