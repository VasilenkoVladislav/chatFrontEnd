import Cookies from 'js-cookie';
import { currentTime } from 'helpers/currentTime';
import { put} from 'redux-saga/effects';
import { updateCookie } from 'redux/actions/entities/cookiesActions';

export function * updateCookieClient (name, data) {
    Cookies.set(name, data, {
        expires: (currentTime.getTime() / 1000) + 14 * 24 * 3600,
        path: '/'
    });
    yield put(updateCookie(name));
}
