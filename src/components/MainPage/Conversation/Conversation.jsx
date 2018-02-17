import './Conversation.scss';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    conversation: PropTypes.object.isRequired,
    closeConversation: PropTypes.func.isRequired,
    showConversation: PropTypes.func.isRequired
};

const Conversation = ({conversationIdShow, conversation, showConversation}) => {
    const handleClickShowConversation = () => {
        if (conversation.id !== conversationIdShow) {
            showConversation(conversation.id);
        }
    };
    return (
        <div className="ch-conversation-wrap" onClick={handleClickShowConversation}>
            <span>{conversation.name}
            </span>
        </div>
    );
};

Conversation.propTypes = propTypes;

export default Conversation;
