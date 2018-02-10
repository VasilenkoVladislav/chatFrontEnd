import * as actions from 'redux/actions/entities/cookiesActions';
import * as constansActions from 'redux/constansActions';

describe('cookiesActions', () => {
    it('should return action type UPDATE_COOKIE and payload cookie name if call updateCookieClient', () => {
        const expectedValue = { type: constansActions.UPDATE_COOKIE, payload: 'authHeaders' };
        expect(actions.updateCookie('authHeaders')).toEqual(expectedValue);
    });
});
