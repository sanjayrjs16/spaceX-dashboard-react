import {SET_APP_THEME} from '../actions/AppActionTypes';
const initialState = {
    theme: true,
    isLoading: false
}
const AppReducer = (state: any = initialState, action: any) => {
   switch(action.type){
       case SET_APP_THEME:{
         return {...state, theme: !action.payload}
           
       }
       default: {
           return {...state}
       }
   }
}
export default AppReducer;