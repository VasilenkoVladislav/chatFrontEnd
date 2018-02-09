import { UPDATE_HEADERS, SIGN_OUT_SUCCESS } from 'redux/constansActions';

const initialState = { };

export default function (state = initialState, action) {
    switch (action.type) {
    case UPDATE_HEADERS:
        return { ...state, ...action.payload };
    case SIGN_OUT_SUCCESS:
        return initialState;
    default:
        return state;
    }
}
