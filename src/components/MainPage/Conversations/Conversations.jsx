import './Conversations.scss';
import React, { Component } from 'react';
import _ from 'lodash';
import Conversation from 'components/MainPage/Conversation';
import PropTypes from 'prop-types';

const propTypes = {
    conversations: PropTypes.object.isRequired,
    getConversations: PropTypes.func.isRequired
};

class Conversations extends Component {
    constructor (props) {
        super(props);
    }
    componentWillMount () {
        this.props.getConversations();
    }
    render () {
        const { conversations } = this.props;
        return (
            <div>
                {_.map(conversations, conversation =>
                    <div key={conversation.id}>
                        <Conversation conversation={conversation}/>
                    </div>
                )}
            </div>
        );
    }
}

Conversations.propTypes = propTypes;

export default Conversations;
