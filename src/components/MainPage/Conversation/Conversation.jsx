import './Conversation.scss';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    conversation: PropTypes.object.isRequired
};

const Conversation = ({conversation}) => {
    return (
        <div>{conversation.id}</div>
    );
};

Conversation.propTypes = propTypes;

export default Conversation;
