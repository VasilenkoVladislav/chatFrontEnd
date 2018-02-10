import * as sagas from 'redux/sagas/cookiesSaga';
import { put } from 'redux-saga/effects';
import { updateCookie } from 'redux/actions/entities/cookiesActions';

describe('cookiesSaga', () => {
    const generator = sagas.updateCookieClient('authHeaders', '');
    it('must call updateCookie', () => {
        const actualValue = generator.next().value;
        expect(actualValue).toEqual(put(updateCookie('authHeaders')));
    });
});
