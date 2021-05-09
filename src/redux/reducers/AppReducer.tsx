import {SET_APP_THEME, SET_TOGGLE_MENU} from '../actions/AppActionTypes';
const initialState = {
    theme: true,
    showMenu: false
}
const AppReducer = (state: any = initialState, action: any) => {
    console.log("Firing reducer");
   switch(action.type){
       case SET_APP_THEME:{
         return {...state, theme: !action.payload}
           
       }
       case SET_TOGGLE_MENU:{
        return {...state, showMenu: !action.payload}
          
      }
       default: {
           return {...state}
       }
   }
}
export default AppReducer;