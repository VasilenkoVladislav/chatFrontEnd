import { put, call} from 'redux-saga/effects';
import { authTokenFormat } from 'default/tokenFormat';
import { updateCookieClient } from 'redux/sagas/cookiesSaga';
import { updateHeaders } from 'redux/actions/headersActions';

export function * updateHeadersClient (headers) {
    if (headers && headers['access-token'] && headers['client'] && headers['uid']) {
        headers = authTokenFormat(headers);
        yield call(updateCookieClient, 'authHeaders', JSON.stringify(headers));
        yield put(updateHeaders(headers));
    }
}
