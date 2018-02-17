import { getMessagesRequest, createMessageRequest } from 'redux/actions/entities/messagesActions';
import { connect } from 'react-redux';
import { makeGetMessagesByConversationIdState } from 'redux/selectors/entities/messagesSelectors';
import Messages from './Messages';

const makeMapStateToProps = () => {
    const getMessagesByConversationIdState = makeGetMessagesByConversationIdState();
    return (state, ownProps) => {
        return {
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
