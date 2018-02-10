import './RegistrationPage.scss';
import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { validateRegistrationSignIn } from 'constants/validateConstants';

const propTypes = {
    isLoading: PropTypes.bool.isRequired,
    registration: PropTypes.func.isRequired
};

class RegistrationPage extends Component {
    constructor (props) {
        super(props);
        this.state = {
            email: '',
            userName: '',
            password: '',
            confirmPassword: '',
            emailValid: false,
            userNameValid: false,
            passwordValid: false,
            confirmPasswordValid: false,
            formValid: false
        };
    }
    registrationOnClick = (event) => {
        if (this.state.formValid) {
            const data = {
                email: this.state.email,
                name: this.state.userName,
                password: this.state.password,
                confirm_password: this.state.confirmPassword
            };
            this.props.registration(data);
            this.setState({ email: '', userName: '', password: '', confirmPassword: '' });
        }
        event.preventDefault();
    };
    handleChangeInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value }, () => this.validateField(name, value));
    };
    validateField = (fieldName, value) => {
        let emailValid = this.state.emailValid;
        let userNameValid = this.state.userNameValid;
        let passwordValid = this.state.passwordValid;
        let confirmPasswordValid = this.state.confirmPasswordValid;
        switch (fieldName) {
        case 'email':
            emailValid = (validateRegistrationSignIn.email).test(value);
            break;
        case 'userName':
            userNameValid = (validateRegistrationSignIn.name).test(value);
            break;
        case 'password':
            passwordValid = (validateRegistrationSignIn.password).test(value);
            confirmPasswordValid = this.state.password === this.state.confirmPassword;
            break;
        case 'confirmPassword':
            confirmPasswordValid = this.state.password === this.state.confirmPassword;
            break;
        default:
            break;
        }
        this.setState({
            emailValid,
            userNameValid,
            passwordValid,
            confirmPasswordValid,
            formValid: emailValid && userNameValid && passwordValid && confirmPasswordValid
        });
    };
    render () {
        return (
            <div className="ch-registration">
                <form className="ch-registration-form">
                    <header className="ch-registration-form-header">Registration</header>
                    <div className="ch-registration-from-container">
                        <div className="ch-registration-form-input-wrap">
                            <span className="ch-registration-form-label">Email</span>
                            <i className="ch-registration-form-icon fas fa-envelope"/>
                            <input type="email"
                                className="ch-registration-form-input"
                                placeholder="Type your email"
                                name="email"
                                maxLength={30}
                                value={this.state.email}
                                onChange={this.handleChangeInput}/>
                        </div>
                        <div className="ch-registration-form-input-wrap">
                            <span className="ch-registration-form-label">Username</span>
                            <i className="ch-registration-form-icon fas fa-user"/>
                            <input type="text"
                                className="ch-registration-form-input"
                                placeholder="Type your username"
                                name="userName"
                                maxLength={30}
                                value={this.state.userName}
                                onChange={this.handleChangeInput}/>
                        </div>
                        <div className="ch-registration-form-input-wrap">
                            <span className="ch-registration-form-label">Password</span>
                            <i className="ch-registration-form-icon fas fa-lock"/>
                            <input type="password"
                                className="ch-registration-form-input"
                                placeholder="Type your password"
                                name="password"
                                maxLength={30}
                                value={this.state.password}
                                onChange={this.handleChangeInput}/>
                        </div>
                        <div className="ch-registration-form-input-wrap">
                            <span className="ch-registration-form-label">Confirm password</span>
                            <i className="ch-registration-form-icon fas fa-key"/>
                            <input type="password"
                                className="ch-registration-form-input"
                                placeholder="Type your confirm password"
                                name="confirmPassword"
                                maxLength={30}
                                value={this.state.confirmPassword}
                                onChange={this.handleChangeInput}/>
                        </div>
                        <div className="ch-registration-form-button-wrap">
                            <div className="ch-registration-form-button-background"/>
                            <button className="ch-registration-form-button"
                                disabled={this.props.isLoading}
                                onClick={this.registrationOnClick}>registration</button>
                        </div>
                    </div>
                    <footer className="ch-registration-form-footer">
                        <span className="ch-registration-form-text-content ch-margin-bottom-big">Or Sign In Using</span>
                        <Link to="/sign_in" className="ch-registration-form-link">SIGN IN</Link>
                    </footer>
                </form>
            </div>
        );
    }
}

RegistrationPage.propTypes = propTypes;

export default RegistrationPage;
