import { SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_IN_ERROR,
    REGISTRATION_REQUEST,
    REGISTRATION_SUCCESS,
    REGISTRATION_ERROR } from 'redux/constansActions';
import { user } from 'data/userData';
import userReducer from 'redux/reducers/entities/userReducer';

describe('user reducer', () => {
    it('should return the initial state', () => {
        const expectedValue = {
            info: {},
            isLoading: false,
            isSignIn: false
        };
        expect(userReducer(undefined, {})).toEqual(expectedValue);
    });
    it('should handle SIGN_IN_REQUEST', () => {
        const data = {
            email: 'email',
            password: 'password'
        };
        const expectedValue = {
            isLoading: true
        };
        expect(userReducer({}, { type: SIGN_IN_REQUEST, payload: data})).toEqual(expectedValue);
    });
    it('should handle SIGN_IN_SUCCESS', () => {
        const expectedValue = {
            info: user.info,
            isLoading: false,
            isSignIn: true
        };
        expect(userReducer({}, { type: SIGN_IN_SUCCESS, payload: user.info })).toEqual(expectedValue);
    });
    it('should handle SIGN_IN_ERROR', () => {
        const expectedValue = {
            isLoading: false
        };
        expect(userReducer({}, { type: SIGN_IN_ERROR })).toEqual(expectedValue);
    });
    it('should handle REGISTRATION_REQUEST', () => {
        const data = {
            email: 'email',
            name: 'name',
            password: 'password',
            confirm_password: 'password'
        };
        const expectedValue = {
            isLoading: true
        };
        expect(userReducer({}, { type: REGISTRATION_REQUEST, payload: data})).toEqual(expectedValue);
    });
    it('should handle REGISTRATION_SUCCESS', () => {
        const expectedValue = {
            isLoading: false
        };
        expect(userReducer({}, { type: REGISTRATION_SUCCESS })).toEqual(expectedValue);
    });
    it('should handle REGISTRATION_ERROR', () => {
        const expectedValue = {
            isLoading: false
        };
        expect(userReducer({}, { type: REGISTRATION_ERROR })).toEqual(expectedValue);
    });
});
