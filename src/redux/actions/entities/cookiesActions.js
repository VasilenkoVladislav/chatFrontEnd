import { UPDATE_COOKIE } from 'redux/constansActions';

export function updateCookie (name) {
    return { type: UPDATE_COOKIE, payload: name };
}
