import { browserHistory } from 'react-router';
import configureStore from 'redux/configureStore';
import createSagaMiddleware from 'redux-saga';
import { currentTime } from 'helpers/currentTime';
import { getUserIsSignInState } from 'redux/selectors/entities/userSelectors';
import rootSaga from 'redux/sagas';
import { syncHistoryWithStore } from 'react-router-redux';
import { webSocketSingleton } from 'webSocket';

export function initialize () {
    currentTime.startCountdown();
    const initialState = window.REDUX_INITIAL_STATE || {};
    const sagaMiddleware = createSagaMiddleware();
    const store = configureStore(initialState, sagaMiddleware);
    const history = syncHistoryWithStore(browserHistory, store);
    const head = document.getElementsByTagName('head')[0];
    const initialStateScript = document.getElementById('initialState');
    webSocketSingleton.initializeWebSocket(store);
    if (window.REDUX_INITIAL_STATE && initialStateScript) {
        delete window.REDUX_INITIAL_STATE;
        head.removeChild(initialStateScript);
    }
    if (getUserIsSignInState(store.getState())) {
        webSocketSingleton.getWebSocket().createWebSocketConnection();
    }
    sagaMiddleware.run(rootSaga);
    return { store, history };
}
