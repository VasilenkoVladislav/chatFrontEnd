import { SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_IN_ERROR,
    SIGN_OUT_REQUEST,
    SIGN_OUT_SUCCESS } from 'redux/constansActions';

export function signInRequest (email, password) {
    return { type: SIGN_IN_REQUEST, payload: {email, password} };
}
export function signInSuccess (data) {
    return { type: SIGN_IN_SUCCESS, payload: data };
}
export function signInError () {
    return { type: SIGN_IN_ERROR };
}
export function signOutRequest () {
    return { type: SIGN_OUT_REQUEST };
}
export function signOutSuccess () {
    return { type: SIGN_OUT_SUCCESS };
}
