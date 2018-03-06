import './ModalConverdsationUser.scss';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired
};

const ModalConversationUser = ({ isOpen, toggleModal }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={toggleModal}
            contentLabel="Example Modal"
            overlayClassName="Overlay">
            <div>Modal Conversation User</div>
        </Modal>);
};

ModalConversationUser.propTypes = propTypes;

export default ModalConversationUser;
