import './Messages.scss';
import React, { Component } from 'react';
import CreateMessage from 'components/MainPage/CreateMessage';
import Message from 'components/MainPage/Message';
import PropTypes from 'prop-types';
import UpdateMessage from 'components/MainPage/UpdateMessage';

const propTypes = {
    currentUserId: PropTypes.string.isRequired,
    conversation: PropTypes.object.isRequired,
    conversationId: PropTypes.string.isRequired,
    messages: PropTypes.array.isRequired,
    createMessage: PropTypes.func.isRequired,
    getMessages: PropTypes.func.isRequired,
    deleteMessage: PropTypes.func.isRequired,
    updateMessage: PropTypes.func.isRequired,
    updateMessageInfo: PropTypes.shape({
        isOpen: PropTypes.bool,
        messageId: PropTypes.string,
        content: PropTypes.string
    }).isRequired,
    showUpdateMessage: PropTypes.func.isRequired
};

class Messages extends Component {
    constructor (props) {
        super(props);
    }
    componentWillMount () {
        this.props.getMessages();
    }
    componentDidUpdate (prevProps) {
        if (this.props.conversationId !== prevProps.conversationId && this.props.messages && this.props.messages.length === 0) {
            this.props.getMessages();
        }
        if (this.props.messages.length !== prevProps.messages.length) {
            this.scrollBottom();
        }
    }
    scrollBottom = () => {
        if (this.list) {
            this.list.scrollTop = this.list.scrollHeight;
        }
    };
    renderMessages = () => {
        const { messages, currentUserId, deleteMessage, showUpdateMessage } = this.props;
        return messages.map((message, index) => {
            const prevIndex = index - 1;
            const prevMessageUserId = prevIndex >= 0 ? messages[prevIndex].user_id : '';
            return <li key={message.id}>
                <Message message={message}
                    currentUserId={currentUserId}
                    prevMessageUserId={prevMessageUserId}
                    deleteMessage={deleteMessage}
                    showUpdateMessage={showUpdateMessage}/>
            </li>;
        });
    };
    render () {
        const { createMessage, updateMessage, conversation, updateMessageInfo } = this.props;
        return (
            <div className="ch-messages-wrap">
                <header className="ch-messages-header">
                    <img className="ch-avatar-small" src={conversation.user_avatar_small || '/static/images/default-avatar.png'}/>
                    <div className="ch-messages-header-user-info-block">
                        <div className="ch-messages-header-username">
                            {conversation.user_name}
                        </div>
                        <div className="ch-messages-header-city">
                            <span>Kiev, </span>
                            <span>Ukraine 12:00 PM</span>
                        </div>
                    </div>
                    <div className="ch-messages-header-call-block">
                        <div className="ch-messages-header-icon-wrap ch-margin-right-medium">
                            <i className="ch-icon fas fa-video"/>
                        </div>
                        <div className="ch-messages-header-icon-wrap ch-margin-right-medium">
                            <i className="ch-icon fas fa-phone"/>
                        </div>
                        <div className="ch-messages-header-icon-wrap">
                            <i className="ch-icon fas fa-ellipsis-h"/>
                        </div>
                    </div>
                </header>
                <div className="ch-messages-container">
                    <ul className="ch-messages-list-wrap" ref={ul => this.list = ul}>
                        {this.renderMessages()}
                    </ul>
                </div>
                <footer className="ch-messages-footer">
                    {!updateMessageInfo.isOpen
                        ? <CreateMessage createMessage={createMessage}/>
                        : <UpdateMessage updateMessage={updateMessage}
                            updateMessageContent={updateMessageInfo.content}
                            updateMessageId={updateMessageInfo.messageId}/>
                    }
                </footer>
            </div>
        );
    }
}

Messages.propTypes = propTypes;

export default Messages;
