import Cookies from 'js-cookie';
import { currentTime } from 'helpers/currentTime';
import { put} from 'redux-saga/effects';
import { UPDATE_COOKIE_CLIENT } from 'redux/constansActions';

export function * updateCookieClient (name, data) {
    Cookies.set(name, data, {
        expires: (currentTime.getTime() / 1000) + 14 * 24 * 3600,
        path: '/'
    });
    yield put({ type: UPDATE_COOKIE_CLIENT, payload: name });
}
