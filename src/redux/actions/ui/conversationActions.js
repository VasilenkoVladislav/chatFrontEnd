import { SHOW_CONVERSATION, CLOSE_CONVERSATION } from 'redux/constansActions';

export function showConversation (conversationId) {
    return { type: SHOW_CONVERSATION, payload: conversationId };
}

export function closeConversation () {
    return { type: CLOSE_CONVERSATION};
}
