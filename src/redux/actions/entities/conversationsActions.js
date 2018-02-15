import { GET_CONVERSATIONS_REQUEST,
    GET_CONVERSATIONS_SUCCESS,
    GET_CONVERSATIONS_ERROR,
    CREATE_CONVERSATION_REQUEST,
    CREATE_CONVERSATION_SUCCESS,
    CREATE_CONVERSATION_ERROR,
    UPDATE_CONVERSATION_REQUEST,
    UPDATE_CONVERSATION_SUCCESS,
    UPDATE_CONVERSATION_ERROR,
    DELETE_CONVERSATION_REQUEST,
    DELETE_CONVERSATION_SUCCESS,
    DELETE_CONVERSATION_ERROR } from 'redux/constansActions';

export function getConversationsRequest () {
    return { type: GET_CONVERSATIONS_REQUEST };
}

export function getConversationsSuccess (data) {
    return { type: GET_CONVERSATIONS_SUCCESS, payload: data };
}

export function getConversationsError () {
    return { type: GET_CONVERSATIONS_ERROR };
}

export function createConversationRequest (data) {
    return { type: CREATE_CONVERSATION_REQUEST, payload: data };
}

export function createConversationSuccess (data) {
    return { type: CREATE_CONVERSATION_SUCCESS, payload: data };
}

export function createConversationError () {
    return { type: CREATE_CONVERSATION_ERROR };
}

export function updateConversationRequest (conversationId, data) {
    return { type: UPDATE_CONVERSATION_REQUEST, payload: {conversationId, data} };
}

export function updateConversationSuccess (data) {
    return { type: UPDATE_CONVERSATION_SUCCESS, payload: data };
}

export function updateConversationError () {
    return { type: UPDATE_CONVERSATION_ERROR };
}

export function deleteConversationRequest (conversationId) {
    return { type: DELETE_CONVERSATION_REQUEST, payload: conversationId };
}

export function deleteConversationSuccess (conversationId) {
    return { type: DELETE_CONVERSATION_SUCCESS, payload: conversationId };
}

export function deleteConversationError () {
    return { type: DELETE_CONVERSATION_ERROR };
}
