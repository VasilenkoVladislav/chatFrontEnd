import { connect } from 'react-redux';
import { getConversationIdShowState } from 'redux/selectors/ui/conversationSelectors';
import MainPage from './MainPage';

function mapStateToProps (state) {
    return {
        conversationIdShow: getConversationIdShowState(state)
    };
}

export default connect(mapStateToProps)(MainPage);
