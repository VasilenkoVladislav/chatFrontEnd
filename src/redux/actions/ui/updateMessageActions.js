import { SHOW_UPDATE_MESSAGE } from 'redux/constansActions';

export function showUpdateMessage (messageId, content) {
    return { type: SHOW_UPDATE_MESSAGE, payload: { messageId, content } };
}
