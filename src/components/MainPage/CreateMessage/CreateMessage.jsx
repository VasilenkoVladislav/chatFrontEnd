import './CreateMessage.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Textarea from 'react-textarea-autosize';

const propTypes = {
    createMessage: PropTypes.func.isRequired
};

class CreateMessage extends Component {
    constructor (props) {
        super(props);
        this.state = { value: '' };
    }
    handleChangeText = (event) => {
        this.setState({ value: event.target.value });
    };
    handleOnKeyPressText = (event) => {
        if (event.charCode === 13 && !event.shiftKey) {
            const data = {
                content: this.state.value,
                conversation_id: this.props.conversationId
            };
            this.props.createMessage(data);
            this.setState({ value: '' });
            event.preventDefault();
        }
    };
    render () {
        return (
            <div className="ch-create-message-wrap">
                <Textarea maxLength="8192"
                    className="ch-create-message-text"
                    value={this.state.value}
                    onChange={this.handleChangeText}
                    onKeyPress={this.handleOnKeyPressText}/>
            </div>
        );
    }
}

CreateMessage.propTypes = propTypes;

export default CreateMessage;
