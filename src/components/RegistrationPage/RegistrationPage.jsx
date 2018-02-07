import './RegistrationPage.scss';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    isLoading: PropTypes.bool.isRequired,
    registration: PropTypes.func.isRequired
};

const RegistrationPage = () => {
    return (
        <div className="ch-registration">
            <form className="ch-registration-form">
                <header className="ch-registration-form__header">Registration</header>
            </form>
        </div>
    );
};

RegistrationPage.propTypes = propTypes;

export default RegistrationPage;
