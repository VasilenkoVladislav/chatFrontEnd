import { showConversation, closeConversation } from 'redux/actions/ui/conversationActions';
import { connect } from 'react-redux';
import Conversations from './Conversations';
import { getConversationIdShowState } from 'redux/selectors/ui/conversationSelectors';
import { getConversationsEntitiesState } from 'redux/selectors/entities/conversationsSelectors';
import { getConversationsRequest } from 'redux/actions/entities/conversationsActions';

function mapStateToProps (state) {
    return {
        conversationIdShow: getConversationIdShowState(state),
        conversations: getConversationsEntitiesState(state)
    };
}

function mapDispatchToProps (dispatch) {
    return {
        closeConversation: () => dispatch(closeConversation()),
        getConversations: () => dispatch(getConversationsRequest()),
        showConversation: (conversationId) => dispatch(showConversation(conversationId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversations);
