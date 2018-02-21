import { initialize } from './utils';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import routes from 'routes';

const { store, history } = initialize();

const component = (
    <Provider store={store}>
        <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
            {routes(store)}
        </Router>
    </Provider>
);

ReactDOM.hydrate(component, document.getElementById('react-view'));
