import { connect } from 'react-redux';
import { getUserIsLoadingState } from 'redux/selectors/userSelectors';
import RegistrationPage from './RegistrationPage';
import { registrationRequest } from 'redux/actions/registrationActions';

function mapStateToProps (state) {
    return {
        isLoading: getUserIsLoadingState(state)
    };
}

function mapDispatchToProps (dispatch) {
    return ({
        registration: (data) => dispatch(registrationRequest(data))
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
