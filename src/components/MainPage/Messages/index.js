import { getMessagesRequest, createMessageRequest } from 'redux/actions/entities/messagesActions';
import { connect } from 'react-redux';
import { getMessagesByConversationIdState } from 'redux/selectors/entities/messagesSelectors';
import Messages from './Messages';

function mapStateToProps (state, ownProps) {
    return {
        messages: getMessagesByConversationIdState(state, ownProps)
    };
}

function mapDispatchToProps (dispatch, ownProps) {
    return {
        getMessages: () => dispatch(getMessagesRequest(ownProps.conversationId)),
        createMessage: (data) => dispatch(createMessageRequest(ownProps.conversationId, data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
