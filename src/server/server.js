import { match, RouterContext } from 'react-router';
import configureStore from 'redux/configureStore';
import cookieParser from 'cookie-parser';
import createSagaMiddleware from 'redux-saga';
import express from 'express';
import parseAuthHeaders from './utils/parseAuthHeaders';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDom from 'react-dom/server';
import renderHTML from './utils/renderHTML';
import routes from 'routes';
import { validateToken } from './utils/validateToken';

const app = express();

app.use('/static', express.static('public/static'));
app.use(cookieParser());
app.use(async (req, res) => {
    const sagaMiddleware = createSagaMiddleware();
    const store = configureStore({}, sagaMiddleware);
    const headers = parseAuthHeaders(req.cookies);
    if (headers) {
        await validateToken(headers, res, store);
    }
    res.cookie('serverTime', Date.now(), { maxAge: (Date.now() / 1000) + 31 * 24 * 3600 });
    match({routes: routes(store), location: req.url}, (error, redirectLocation, renderProps) => {
        if (redirectLocation) {
            return res.redirect(301, redirectLocation.pathname + redirectLocation.search);
        } else if (error) {
            return res.status(500).send(error.message);
        } else if (!renderProps) {
            return res.redirect(301, '/');
        } else {
            const componentHTML = ReactDom.renderToString(
                <Provider store={store}>
                    <RouterContext {...renderProps} />
                </Provider>
            );
            return res.end(renderHTML(componentHTML, store.getState()));
        }
    });
});

app.listen(process.env.PORT || 3002);
