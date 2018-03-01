import { SHOW_UPDATE_MESSAGE, UPDATE_MESSAGE_SUCCESS } from 'redux/constansActions';

const initialState = {
    messageId: '',
    content: '',
    isOpen: false
};

export default function (state = initialState, action) {
    switch (action.type) {
    case SHOW_UPDATE_MESSAGE:
        return { ...state, ...action.payload, isOpen: true };
    case UPDATE_MESSAGE_SUCCESS:
        return initialState;
    default:
        return state;
    }
}
