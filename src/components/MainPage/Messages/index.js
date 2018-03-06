import { getMessagesRequest, createMessageRequest, deleteMessageRequest, updateMessageRequest } from 'redux/actions/entities/messagesActions';
import { connect } from 'react-redux';
import { getConversationByIdState } from 'redux/selectors/entities/conversationsSelectors';
import { getCurrentUserIdState } from 'redux/selectors/entities/userSelectors';
import { getUpdateMessageState } from 'redux/selectors/ui/updateMessageSelectors';
import { makeGetMessagesByConversationIdState } from 'redux/selectors/entities/messagesSelectors';
import Messages from './Messages';
import { showUpdateMessage } from 'redux/actions/ui/updateMessageActions';
import { toggleModal } from 'redux/actions/ui/modalsActions';

const makeMapStateToProps = () => {
    const getMessagesByConversationIdState = makeGetMessagesByConversationIdState();
    return (state, ownProps) => {
        return {
            conversation: getConversationByIdState(state, ownProps),
            currentUserId: getCurrentUserIdState(state),
            messages: getMessagesByConversationIdState(state, ownProps),
            updateMessageInfo: getUpdateMessageState(state)
        };
    };
};

function mapDispatchToProps (dispatch, ownProps) {
    return {
        toggleModal: (data) => dispatch(toggleModal('conversationUser', data)),
        getMessages: () => dispatch(getMessagesRequest(ownProps.conversationId)),
        createMessage: (data) => dispatch(createMessageRequest(ownProps.conversationId, data)),
        deleteMessage: (messageId) => dispatch(deleteMessageRequest(ownProps.conversationId, messageId)),
        updateMessage: (messageId, content) => dispatch(updateMessageRequest(ownProps.conversationId, messageId, content)),
        showUpdateMessage: (messageId, content) => dispatch(showUpdateMessage(messageId, content))
    };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(Messages);
