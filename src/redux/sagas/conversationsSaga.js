import { GET_CONVERSATIONS_REQUEST,
    CREATE_CONVERSATION_REQUEST,
    UPDATE_CONVERSATION_REQUEST,
    DELETE_CONVERSATION_REQUEST } from 'redux/constansActions';
import { getConversationsSuccess,
    getConversationsError,
    createConversationSuccess,
    createConversationError,
    updateConversationSuccess,
    updateConversationError,
    deleteConversationSuccess,
    deleteConversationError } from 'redux/actions/entities/conversationsActions';
import { put, call, takeEvery, select } from 'redux-saga/effects';
import api from 'configApi/apiResources';
import { getHeadersState } from 'redux/selectors/entities/headersSelectors';
import { updateHeadersClient } from 'redux/sagas/headersSaga';
import { webSocketSingleton } from 'webSocket';

export function * getConversations () {
    const headersForRequest = yield select(getHeadersState);
    const { data, headers } = yield call(api.conversations.getConversations, headersForRequest);
    if (data && headers) {
        yield call(updateHeadersClient, headers);
        Object.keys(data.conversations).map(key => {
            webSocketSingleton.getWebSocket().subscribeConversationChannel(key);
        });
        yield put(getConversationsSuccess(data.conversations));
    } else {
        yield put(getConversationsError());
    }
}

export function * createConversation ({payload}) {
    const headersForRequest = yield select(getHeadersState);
    const { data, headers } = yield call(api.conversations.createConversation, payload, headersForRequest);
    if (data && headers) {
        yield call(updateHeadersClient, headers);
        webSocketSingleton.getWebSocket().subscribeConversationChannel(data.conversation.id);
        yield put(createConversationSuccess(data.conversation));
    } else {
        yield put(createConversationError());
    }
}

export function * updateConversation ({payload}) {
    const headersForRequest = yield select(getHeadersState);
    const { data, headers } = yield call(api.conversations.updateConversation, payload, headersForRequest);
    if (data && headers) {
        yield call(updateHeadersClient, headers);
        yield put(updateConversationSuccess(data.conversation));
    } else {
        yield put(updateConversationError());
    }
}

export function * deleteConversation ({payload}) {
    const headersForRequest = yield select(getHeadersState);
    const { headers, error } = yield call(api.conversations.deleteConversation, payload, headersForRequest);
    if (headers && !error) {
        yield call(updateHeadersClient, headers);
        yield put(deleteConversationSuccess(payload));
    } else {
        yield put(deleteConversationError());
    }
}

export function * watchGetConversations () {
    yield takeEvery(GET_CONVERSATIONS_REQUEST, getConversations);
}

export function * watchCreateConversation () {
    yield takeEvery(CREATE_CONVERSATION_REQUEST, createConversation);
}

export function * watchUpdateConversation () {
    yield takeEvery(UPDATE_CONVERSATION_REQUEST, updateConversation);
}

export function * watchDeleteConversation () {
    yield takeEvery(DELETE_CONVERSATION_REQUEST, deleteConversation);
}

export const conversationsSagas = [
    watchGetConversations(),
    watchCreateConversation(),
    watchDeleteConversation(),
    watchUpdateConversation()
];
