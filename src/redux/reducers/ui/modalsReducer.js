import { TOGGLE_MODAL } from 'redux/constansActions';

const initialState = [];

export default function (state = initialState, action) {
    switch (action.type) {
    case TOGGLE_MODAL:
        return toggleModal(state, action);
    default:
        return state;
    }
}

function toggleModal (state, action) {
    if (state.find(modal => modal.type === action.payload.type)) {
        return state.filter(modal => modal.type !== action.payload.type);
    } else {
        return [...state, action.payload];
    }
}
