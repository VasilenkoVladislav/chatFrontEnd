import './Message.scss';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    message: PropTypes.object.isRequired
};

const Message = ({message}) => {
    return (
        <div className="ch-message-wrap">{message.content}</div>
    );
};

Message.propTypes = propTypes;

export default Message;
