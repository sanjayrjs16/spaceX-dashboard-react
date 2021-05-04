import {SET_APP_THEME} from './AppActionTypes';

export const setAppTheme = (theme: boolean) => {
    return {
        type: SET_APP_THEME,
        payload: theme
    }
}