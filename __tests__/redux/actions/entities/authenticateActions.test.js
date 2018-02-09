import * as actions from 'redux/actions/entities/authenticateActions';
import * as constansActions from 'redux/constansActions';
import { user } from 'data/userData';

describe('authenticateActions', () => {
    it('should return action type SIGN_IN_REQUEST and payload email with password if call signInRequest', () => {
        const data = {
            email: 'email',
            password: 'password'
        };
        const expectedValue = { type: constansActions.SIGN_IN_REQUEST, payload: data };
        expect(actions.signInRequest('email', 'password')).toEqual(expectedValue);
    });
    it('should return action type SIGN_IN_SUCCESS and payload user if call signInSuccess', () => {
        const expectedValue = { type: constansActions.SIGN_IN_SUCCESS, payload: user };
        expect(actions.signInSuccess(user)).toEqual(expectedValue);
    });
    it('should return action type SIGN_IN_ERROR if call signInError', () => {
        const expectedValue = { type: constansActions.SIGN_IN_ERROR };
        expect(actions.signInError()).toEqual(expectedValue);
    });
    it('should return action type SIGN_OUT_REQUEST if call signOutRequest', () => {
        const expectedValue = { type: constansActions.SIGN_OUT_REQUEST };
        expect(actions.signOutRequest()).toEqual(expectedValue);
    });
    it('should return action type SIGN_OUT_SUCCESS if call signOutSuccess', () => {
        const expectedValue = { type: constansActions.SIGN_OUT_SUCCESS };
        expect(actions.signOutSuccess()).toEqual(expectedValue);
    });
    it('should return action type SIGN_OUT_ERROR if call signOutError', () => {
        const expectedValue = { type: constansActions.SIGN_OUT_ERROR };
        expect(actions.signOutError()).toEqual(expectedValue);
    });
});
