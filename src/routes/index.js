import { Route, IndexRedirect} from 'react-router';
import App from 'components/App';
import MainPage from 'components/MainPage';
import React from 'react';
import RegistrationPage from 'components/RegistrationPage';
import SignInPage from 'components/SignInPage';

function requireAuth (nextState, replace, cb) {
    if (!store.getState().entities.user.isSignIn) {
        replace({
            pathname: '/sign_in'
        });
    }
    cb();
}

function requireAlreadyAuth (nextState, replace, cb) {
    if (store.getState().entities.user.isSignIn) {
        replace({
            pathname: '/'
        });
    }
    cb();
}

let store;

export default function routes (storeRef) {
    store = storeRef;
    return (
        <Route component={App} >
            <IndexRedirect to="/sign_in" />
            <Route path="/sign_in" component={SignInPage} onEnter={requireAlreadyAuth}/>
            <Route path="/registration" component={RegistrationPage} onEnter={requireAlreadyAuth}/>
            <Route path="/" component={ MainPage } onEnter={requireAuth}/>
        </Route>
    );
}
