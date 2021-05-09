import {combineReducers} from 'redux';
import AppReducer from './AppReducer'
import LaunchReducer from './LaunchReducer';

export default combineReducers({
    app: AppReducer,
    launch: LaunchReducer
  });