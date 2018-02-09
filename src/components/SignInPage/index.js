import { connect } from 'react-redux';
import { getUserIsLoadingState } from 'redux/selectors/entities/userSelectors';
import { oAuthSignInRequest } from 'redux/actions/entities/oAuthenticateActions';
import SignInPage from './SignInPage';
import { signInRequest } from 'redux/actions/entities/authenticateActions';

function mapStateToProps (state) {
    return {
        isLoading: getUserIsLoadingState(state)
    };
}

function mapDispatchToProps (dispatch) {
    return ({
        oAuthSignIn: (provider) => dispatch(oAuthSignInRequest(provider)),
        signIn: (login, password) => dispatch(signInRequest(login, password))
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
