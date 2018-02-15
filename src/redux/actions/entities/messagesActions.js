import { GET_MESSAGES_REQUEST,
    GET_MESSAGES_SUCCESS,
    GET_MESSAGES_ERROR,
    CREATE_MESSAGE_REQUEST,
    CREATE_MESSAGE_SUCCESS,
    CREATE_MESSAGE_ERROR,
    UPDATE_MESSAGE_REQUEST,
    UPDATE_MESSAGE_SUCCESS,
    UPDATE_MESSAGE_ERROR,
    DELETE_MESSAGE_REQUEST,
    DELETE_MESSAGE_SUCCESS,
    DELETE_MESSAGE_ERROR } from 'redux/constansActions';

export function getMessagesRequest () {
    return { type: GET_MESSAGES_REQUEST };
}

export function getMessagesSuccess (conversationId, data) {
    return { type: GET_MESSAGES_SUCCESS, payload: {conversationId, data} };
}

export function getMessagesError () {
    return { type: GET_MESSAGES_ERROR };
}

export function createMessageRequest (conversationId, data) {
    return { type: CREATE_MESSAGE_REQUEST, payload: {conversationId, data} };
}

export function createMessageSuccess (conversationId, data) {
    return { type: CREATE_MESSAGE_SUCCESS, payload: {conversationId, data} };
}

export function createMessageError () {
    return { type: CREATE_MESSAGE_ERROR };
}

export function updateMessageRequest (conversationId, messageId, data) {
    return { type: UPDATE_MESSAGE_REQUEST, payload: {conversationId, messageId, data} };
}

export function updateMessageSuccess (conversationId, data) {
    return { type: UPDATE_MESSAGE_SUCCESS, payload: {conversationId, data} };
}

export function updateMessageError () {
    return { type: UPDATE_MESSAGE_ERROR };
}

export function deleteMessageRequest (conversationId, messageId) {
    return { type: DELETE_MESSAGE_REQUEST, payload: {conversationId, messageId} };
}

export function deleteMessageSuccess (conversationId, messageId) {
    return { type: DELETE_MESSAGE_SUCCESS, payload: {conversationId, messageId} };
}

export function deleteMessageError () {
    return { type: DELETE_MESSAGE_ERROR };
}
