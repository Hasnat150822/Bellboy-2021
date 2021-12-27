import { URL, USER_NAME } from '../model/url.model';
import * as allActions from '../actions';
const initialState:URL = {
    url:undefined
}
export function urlReducer(state=initialState, action:allActions.Action):URL {
    switch (action.type) {
        case allActions.actionTypes.SEND_URL:
            return {...state, url:action.payload}
        case allActions.actionTypes.RESET_URL:
            return {...state, url:undefined}
        default:
            return {...state};
    }
}
const defaultUser:USER_NAME = {
    data:undefined
}
export function userReducer(state=defaultUser, action:allActions.Action):USER_NAME {
    switch (action.type) {
        case allActions.actionTypes.PANEL_USER:
            return {...state, data:action.payload}
        default:
            return {...state}
    }
} 