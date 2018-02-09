import * as actions from 'redux/actions/entities/registrationActions';
import * as constansActions from 'redux/constansActions';

describe('authenticateActions', () => {
    it('should return action type REGISTRATION_REQUEST and payload data if call signInRequest', () => {
        const data = {
            email: 'email',
            name: 'name',
            password: 'password',
            confirm_password: 'password'
        };
        const expectedValue = { type: constansActions.REGISTRATION_REQUEST, payload: data };
        expect(actions.registrationRequest(data)).toEqual(expectedValue);
    });
    it('should return action type REGISTRATION_SUCCESS if call registrationSuccess', () => {
        const expectedValue = { type: constansActions.REGISTRATION_SUCCESS };
        expect(actions.registrationSuccess()).toEqual(expectedValue);
    });
    it('should return action type REGISTRATION_ERROR if call registrationError', () => {
        const expectedValue = { type: constansActions.REGISTRATION_ERROR };
        expect(actions.registrationError()).toEqual(expectedValue);
    });
});
