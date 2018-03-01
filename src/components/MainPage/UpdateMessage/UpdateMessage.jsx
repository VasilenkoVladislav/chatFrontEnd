import './UpdateMessage.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Textarea from 'react-textarea-autosize';

const propTypes = {
    updateMessage: PropTypes.func.isRequired,
    updateMessageId: PropTypes.string.isRequired,
    updateMessageContent: PropTypes.string.isRequired
};

class UpdateMessage extends Component {
    constructor (props) {
        super(props);
        this.state = { value: this.props.updateMessageContent };
    }
    handleChangeText = (event) => {
        this.setState({ value: event.target.value });
    };
    handleOnKeyPressText = (event) => {
        if (this.state.value.trim() !== '' && event.charCode === 13 && !event.shiftKey) {
            const data = { content: this.state.value };
            this.props.updateMessage(this.props.updateMessageId, data);
            this.setState({ value: '' });
            event.preventDefault();
        }
    };
    render () {
        return (
            <div className="ch-update-message-wrap">
                <Textarea maxLength="8192"
                    className="ch-update-message-text"
                    value={this.state.value}
                    onChange={this.handleChangeText}
                    onKeyPress={this.handleOnKeyPressText}/>
                <div>
                    <i className="ch-update-message-icon fas fa-plus-circle ch-margin-right-big"/>
                    <i className="ch-update-message-icon fas fa-smile"/>
                </div>
            </div>
        );
    }
}

UpdateMessage.propTypes = propTypes;

export default UpdateMessage;
