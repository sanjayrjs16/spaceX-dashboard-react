import {SET_APP_THEME, SET_TOGGLE_MENU} from './AppActionTypes';

export const setAppTheme = (theme: boolean) => {
    return {
        type: SET_APP_THEME,
        payload: theme
    }
}

export const setToggleMenu = (showMenu: boolean) => {
    return {
        type: SET_TOGGLE_MENU,
        payload: showMenu
    }
}