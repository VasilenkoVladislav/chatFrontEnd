import { browserHistory, Router } from 'react-router';
import configureStore from 'redux/configureStore';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import rootSaga from 'redux/sagas';
import routes from 'routes';
import { syncHistoryWithStore } from 'react-router-redux';

const initialState = window.REDUX_INITIAL_STATE || {};
const sagaMiddleware = createSagaMiddleware();
const store = configureStore(initialState, sagaMiddleware);
const history = syncHistoryWithStore(browserHistory, store);
sagaMiddleware.run(rootSaga);

const component = (
    <Provider store={store}>
        <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
            {routes(store)}
        </Router>
    </Provider>
);

ReactDOM.hydrate(component, document.getElementById('react-view'));
