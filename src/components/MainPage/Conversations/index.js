import { getConversationsRequest, createConversationRequest } from 'redux/actions/entities/conversationsActions';
import { getCurrentUserNameState, getCurrentUserSmallAvatarState } from 'redux/selectors/entities/userSelectors';
import { showConversation, closeConversation } from 'redux/actions/ui/conversationActions';
import { connect } from 'react-redux';
import Conversations from './Conversations';
import { getConversationIdShowState } from 'redux/selectors/ui/conversationSelectors';
import { getConversationsEntitiesState } from 'redux/selectors/entities/conversationsSelectors';

function mapStateToProps (state) {
    return {
        conversationIdShow: getConversationIdShowState(state),
        conversations: getConversationsEntitiesState(state),
        currentUserSmallAvatar: getCurrentUserSmallAvatarState(state),
        currentUserName: getCurrentUserNameState(state)
    };
}

function mapDispatchToProps (dispatch) {
    return {
        closeConversation: () => dispatch(closeConversation()),
        getConversations: () => dispatch(getConversationsRequest()),
        createConversation: (userId) => dispatch(createConversationRequest(userId)),
        showConversation: (conversationId) => dispatch(showConversation(conversationId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversations);
