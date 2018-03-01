import './Message.scss';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    currentUserId: PropTypes.string.isRequired,
    message: PropTypes.object.isRequired,
    deleteMessage: PropTypes.func.isRequired,
    showUpdateMessage: PropTypes.func.isRequired
};

const Message = ({ message, currentUserId, prevMessageUserId, deleteMessage, showUpdateMessage}) => {
    const handleClickDeleteMessage = () => {
        deleteMessage(message.id);
    };
    const handleClickUpdateMessage = () => {
        showUpdateMessage(message.id, message.content);
    };
    return (
        <React.Fragment>
            {currentUserId === message.user_id
                ? <div className="ch-message-wrap current-user-message">
                    <div className="ch-message-content-wrap current-user-message-content">
                        {message.content}
                    </div>
                    <div className="ch-message-manage-wrap">
                        <i className="fas fa-times ch-margin-bottom-medium" onClick={handleClickDeleteMessage}/>
                        <i className="fas fa-pencil-alt" onClick={handleClickUpdateMessage}/>
                    </div>
                </div>
                : <div className="ch-message-wrap conversation-user-message">
                    <div className="ch-message-avatar-wrap">
                        {prevMessageUserId !== message.user_id
                            ? <img className="ch-avatar-small" src={message.user_avatar_small || '/static/images/default-avatar.png'}/>
                            : null }
                    </div>
                    <div className="ch-message-content-wrap conversation-user-message-content">
                        {message.content}
                    </div>
                </div> }
        </React.Fragment>
    );
};

Message.propTypes = propTypes;

export default Message;
