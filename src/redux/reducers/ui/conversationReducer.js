import { SHOW_CONVERSATION,
    CLOSE_CONVERSATION,
    SIGN_OUT_SUCCESS } from 'redux/constansActions';

const initialState = {
    conversationIdShow: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
    case SHOW_CONVERSATION:
        return {...state, conversationIdShow: action.payload};
    case CLOSE_CONVERSATION:
    case SIGN_OUT_SUCCESS:
        return initialState;
    default:
        return state;
    }
}
