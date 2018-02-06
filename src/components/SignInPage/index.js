import { connect } from 'react-redux';
import { getUserIsLoadingState } from 'redux/selectors/userSelectors';
import SignInPage from './SignInPage';
import { signInRequest } from 'redux/actions/authenticateActions';

function mapStateToProps (state) {
    return {
        isLoading: getUserIsLoadingState(state)
    };
}

function mapDispatchToProps (dispatch) {
    return ({
        signIn: (login, password) => dispatch(signInRequest(login, password))
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
