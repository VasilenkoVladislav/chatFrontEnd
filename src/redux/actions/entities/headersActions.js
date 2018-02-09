import { UPDATE_HEADERS } from 'redux/constansActions';

export function updateHeaders (headers) {
    return { type: UPDATE_HEADERS, payload: headers };
}
