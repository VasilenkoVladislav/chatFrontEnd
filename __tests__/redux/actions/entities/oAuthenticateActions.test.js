import * as actions from 'redux/actions/entities/oAuthenticateActions';
import * as constansActions from 'redux/constansActions';
import { headers } from 'data/headersData';

describe('headersActions', () => {
    it('should return action type OAUTHENTICATE_REQUEST and payload provider if call oAuthSignInRequest', () => {
        const expectedValue = { type: constansActions.OAUTHENTICATE_REQUEST, payload: 'facebook' };
        expect(actions.oAuthSignInRequest('facebook')).toEqual(expectedValue);
    });
    it('should return action type VALIDATE_TOKEN_REQUEST and payload headers if call validateTokenRequest', () => {
        const expectedValue = { type: constansActions.VALIDATE_TOKEN_REQUEST, payload: headers };
        expect(actions.validateTokenRequest(headers)).toEqual(expectedValue);
    });
});
