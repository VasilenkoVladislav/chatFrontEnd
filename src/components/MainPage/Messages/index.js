import { getMessagesRequest, createMessageRequest } from 'redux/actions/entities/messagesActions';
import { connect } from 'react-redux';
import { getConversationByIdState } from 'redux/selectors/entities/conversationsSelectors';
import { makeGetMessagesByConversationIdState } from 'redux/selectors/entities/messagesSelectors';
import Messages from './Messages';

const makeMapStateToProps = () => {
    const getMessagesByConversationIdState = makeGetMessagesByConversationIdState();
    return (state, ownProps) => {
        return {
            conversation: getConversationByIdState(state, ownProps),
            messages: getMessagesByConversationIdState(state, ownProps)
        };
    };
};

function mapDispatchToProps (dispatch, ownProps) {
    return {
        getMessages: () => dispatch(getMessagesRequest(ownProps.conversationId)),
        createMessage: (data) => dispatch(createMessageRequest(ownProps.conversationId, data))
    };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(Messages);
