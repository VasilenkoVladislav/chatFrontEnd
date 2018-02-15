import { connect } from 'react-redux';
import Conversations from './Conversations';
import { getConversationsEntitiesState } from 'redux/selectors/entities/conversationsSelectors';
import { getConversationsRequest } from 'redux/actions/entities/conversationsActions';

function mapStateToProps (state) {
    return {
        conversations: getConversationsEntitiesState(state)
    };
}

function mapDispatchToProps (dispatch) {
    return {
        getConversations: () => dispatch(getConversationsRequest())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversations);
