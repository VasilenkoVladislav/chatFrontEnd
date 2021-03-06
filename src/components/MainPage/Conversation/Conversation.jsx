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
        <div className={`ch-conversation-wrap ${conversation.id === conversationIdShow ? 'active' : ''}`} onClick={handleClickShowConversation}>
            <div className="ch-conversation-userinfo-wrap">
                <img className="ch-avatar-small" src={conversation.user_avatar_small || '/static/images/default-avatar.png'}/>
                <div className="ch-conversation-user-block">
                    <span className="ch-conversation-username">{conversation.user_name}</span>
                    <span className="ch-conversation-last-message">{conversation.last_message_content}</span>
                </div>
            </div>
            <div className="ch-conversation-status-wrap">
                <div className="ch-conversation-status"/>
                <span className="ch-conversation-last-messages-time">2 min</span>
            </div>
        </div>
    );
};

Conversation.propTypes = propTypes;

export default Conversation;
