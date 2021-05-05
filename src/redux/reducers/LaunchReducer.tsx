import {SET_QUERY_LAUNCHES} from '../actions/Launches/LaunchesActionTypes';
const initialState = {
    query: {}
}
const LaunchReducer = (state: any = initialState, action: any) => {
    console.log("Inside Launch reducer, got query as", action.payload)
   switch(action.type){
       case SET_QUERY_LAUNCHES:{
         return {...state, query: {...action.payload}}
           
       }
       default: {
           return {...state}
       }
   }
}
export default LaunchReducer;