import { TOGGLE_MODAL } from 'redux/constansActions';

export function toggleModal (type, data = {}) {
    return {type: TOGGLE_MODAL, payload: { type, data }};
}
