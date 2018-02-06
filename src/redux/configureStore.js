import { applyMiddleware, createStore } from 'redux';
import { browserHistory } from 'react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/index';
import { routerMiddleware } from 'react-router-redux';

export default function (initialState = {}, sagaMiddleware) {
    if (process.env.NODE_ENV === 'production') {
        return createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware, routerMiddleware(browserHistory)));
    } else if (process.env.NODE_ENV === 'development') {
        return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(sagaMiddleware, routerMiddleware(browserHistory))));
    } else if (process.env.NODE_ENV === 'test') {
        return createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware, routerMiddleware(browserHistory)));
    } else {
        return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(sagaMiddleware, routerMiddleware(browserHistory))));
    }
}
