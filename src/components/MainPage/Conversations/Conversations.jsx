import './Conversations.scss';
import React, { Component } from 'react';
import Conversation from 'components/MainPage/Conversation';
import PropTypes from 'prop-types';

const propTypes = {
    conversationIdShow: PropTypes.string.isRequired,
    conversations: PropTypes.array.isRequired,
    closeConversation: PropTypes.func.isRequired,
    getConversations: PropTypes.func.isRequired,
    showConversation: PropTypes.func.isRequired
};

class Conversations extends Component {
    constructor (props) {
        super(props);
    }
    componentWillMount () {
        this.props.getConversations();
    }
    render () {
        const { conversationIdShow, conversations, showConversation, closeConversation } = this.props;
        return (
            <React.Fragment>
                {conversations.map(conversation =>
                    <div key={conversation.id}>
                        <Conversation
                            conversation={conversation}
                            conversationIdShow={conversationIdShow}
                            showConversation={showConversation}
                            closeConversation={closeConversation}/>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

Conversations.propTypes = propTypes;

export default Conversations;
