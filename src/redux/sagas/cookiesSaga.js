import Cookies from 'js-cookie';
import { put} from 'redux-saga/effects';
import { updateCookie } from 'redux/actions/entities/cookiesActions';

export function * updateCookieClient (name, data) {
    Cookies.set(name, data, {
        expires: 31,
        path: '/'
    });
    yield put(updateCookie(name));
}
