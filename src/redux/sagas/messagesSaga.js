import { GET_MESSAGES_REQUEST,
    CREATE_MESSAGE_REQUEST,
    UPDATE_MESSAGE_REQUEST,
    DELETE_MESSAGE_REQUEST } from 'redux/constansActions';
import { getMessagesSuccess,
    getMessagesError,
    createMessageSuccess,
    createMessageError,
    updateMessageSuccess,
    updateMessageError,
    deleteMessageSuccess,
    deleteMessageError } from 'redux/actions/entities/messagesActions';
import { put, call, takeEvery, select } from 'redux-saga/effects';
import api from 'configApi/apiResources';
import { getHeadersState } from 'redux/selectors/entities/headersSelectors';
import { updateHeadersClient } from 'redux/sagas/headersSaga';

export function * getMessages ({payload}) {
    const headersForRequest = yield select(getHeadersState);
    const { data, headers } = yield call(api.messages.getMessages, payload, headersForRequest);
    if (data && headers) {
        yield call(updateHeadersClient, headers);
        yield put(getMessagesSuccess(payload, data.messages));
    } else {
        yield put(getMessagesError());
    }
}

export function * createMessage ({payload}) {
    const headersForRequest = yield select(getHeadersState);
    const { data, headers } = yield call(api.messages.createMessage, payload, headersForRequest);
    if (data && headers) {
        yield call(updateHeadersClient, headers);
        yield put(createMessageSuccess(payload.conversationId, data.message));
    } else {
        yield put(createMessageError());
    }
}

export function * updateMessage ({payload}) {
    const headersForRequest = yield select(getHeadersState);
    const { data, headers } = yield call(api.messages.updateMessage, payload, headersForRequest);
    if (data && headers) {
        yield call(updateHeadersClient, headers);
        yield put(updateMessageSuccess(payload.conversationId, data.message));
    } else {
        yield put(updateMessageError());
    }
}

export function * deleteMessage ({payload}) {
    const headersForRequest = yield select(getHeadersState);
    const { headers, error } = yield call(api.messages.deleteMessage, payload, headersForRequest);
    if (headers && !error) {
        yield call(updateHeadersClient, headers);
        yield put(deleteMessageSuccess(payload.conversationId, payload));
    } else {
        yield put(deleteMessageError());
    }
}

export function * watchGetMessages () {
    yield takeEvery(GET_MESSAGES_REQUEST, getMessages);
}

export function * watchCreateMessage () {
    yield takeEvery(CREATE_MESSAGE_REQUEST, createMessage);
}

export function * watchUpdateMessage () {
    yield takeEvery(UPDATE_MESSAGE_REQUEST, updateMessage);
}

export function * watchDeleteMessage () {
    yield takeEvery(DELETE_MESSAGE_REQUEST, deleteMessage);
}

export const messagesSagas = [
    watchGetMessages(),
    watchCreateMessage(),
    watchUpdateMessage(),
    watchDeleteMessage()
];
