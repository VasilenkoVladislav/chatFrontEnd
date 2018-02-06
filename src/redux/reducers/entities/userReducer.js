import { SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_IN_ERROR,
    REGISTRATION_REQUEST,
    REGISTRATION_SUCCESS,
    REGISTRATION_ERROR } from 'redux/constansActions';

const initialState = {
    info: {},
    isLoading: false,
    isSignIn: false
};

export default function (state = initialState, action) {
    switch (action.type) {
    case SIGN_IN_REQUEST:
    case REGISTRATION_REQUEST:
        return { ...state, isLoading: true };
    case SIGN_IN_SUCCESS:
        return { ...state, info: action.payload, isSignIn: true, isLoading: false };
    case SIGN_IN_ERROR:
    case REGISTRATION_ERROR:
    case REGISTRATION_SUCCESS:
        return { ...state, isLoading: false };
    default:
        return state;
    }
}
