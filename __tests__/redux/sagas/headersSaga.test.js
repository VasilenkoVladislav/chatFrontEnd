import * as sagas from 'redux/sagas/headersSaga';
import { call, put } from 'redux-saga/effects';
import { headers } from 'data/headersData';
import { updateCookieClient } from 'redux/sagas/cookiesSaga';
import { updateHeaders } from 'redux/actions/entities/headersActions';

describe('headersSaga', () => {
    describe('updateHeadersClient Saga test if headers exist', () => {
        const generator = sagas.updateHeadersClient(headers);
        it('must call updateCookie', () => {
            const actualValue = generator.next().value;
            expect(actualValue).toEqual(call(updateCookieClient, 'authHeaders', JSON.stringify(headers)));
        });
        it('must call updateHeaders', () => {
            const actualValue = generator.next().value;
            expect(actualValue).toEqual(put(updateHeaders(headers)));
        });
    });
    describe('updateHeadersClient Saga test if headers not exist', () => {
        const generator = sagas.updateHeadersClient();
        it('must not call any action and generator done to equal true', () => {
            const actualValue = generator.next();
            expect(actualValue.done).toEqual(true);
        });
    });
});
