import './SignInPage.scss';
import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { validateRegistrationSignIn } from 'constants/validateConstants';

const propTypes = {
    isLoading: PropTypes.bool.isRequired,
    signIn: PropTypes.func.isRequired,
    oAuthSignIn: PropTypes.func.isRequired
};

class SignInPage extends Component {
    constructor (props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            emailValid: false,
            passwordValid: false,
            formValid: false
        };
    }
    signInOnClick = (event) => {
        if (this.state.formValid) {
            this.props.signIn(this.state.email, this.state.password);
            this.setState({ email: '', password: '' });
        }
        event.preventDefault();
    };
    oAuthSignInOnClick = (provider) => {
        this.props.oAuthSignIn(provider);
    };
    handleChangeInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value }, () => this.validateField(name, value));
    };
    validateField = (fieldName, value) => {
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        switch (fieldName) {
        case 'email':
            emailValid = (validateRegistrationSignIn.email).test(value);
            break;
        case 'password':
            passwordValid = (validateRegistrationSignIn.password).test(value);
            break;
        default:
            break;
        }
        this.setState({
            emailValid,
            passwordValid,
            formValid: emailValid && passwordValid
        });
    };
    render () {
        return (
            <div className="ch-login">
                <form className="ch-login-form">
                    <header className="ch-login-form__header">Login</header>
                    <div className="ch-login-from__container">
                        <div className="ch-login-form__input-wrap">
                            <span className="ch-login-form__label">Username</span>
                            <i className="ch-login-form__icon fas fa-user"/>
                            <input type="email"
                                className="ch-login-form__input"
                                placeholder="Type your username"
                                name="email"
                                maxLength={30}
                                value={this.state.email}
                                onChange={this.handleChangeInput}/>
                        </div>
                        <div className="ch-login-form__input-wrap">
                            <span className="ch-login-form__label">Password</span>
                            <i className="ch-login-form__icon fas fa-lock"/>
                            <input type="password"
                                className="ch-login-form__input"
                                placeholder="Type your password"
                                name="password"
                                maxLength={30}
                                value={this.state.password}
                                onChange={this.handleChangeInput}/>
                        </div>
                        <div className="ch-login-form__forgot-pass-wrap">
                            <Link className="ch-login-form__link">Forgot password?</Link>
                        </div>
                        <div className="ch-login-form__button-wrap">
                            <div className="ch-login-form__button-background"/>
                            <button className="ch-login-form__button" disabled={this.props.isLoading} onClick={this.signInOnClick}>Login</button>
                        </div>
                        <div className="ch-login-form__text-wrap">
                            <span className="ch-login-form__text-content">Or Sign Up Using</span>
                        </div>
                        <div className="ch-login-form__social-wrap">
                            <a className="ch-login-form__social-link ch-login-form__social-link_facebook" onClick={this.oAuthSignInOnClick.bind(this, 'facebook')}>
                                <i className="fab fa-facebook-f"/>
                            </a>
                            <a className="ch-login-form__social-link ch-login-form__social-link_twitter" onClick={this.oAuthSignInOnClick.bind(this, 'twitter')}>
                                <i className="fab fa-twitter"/>
                            </a>
                            <a className="ch-login-form__social-link ch-login-form__social-link_google" onClick={this.oAuthSignInOnClick.bind(this, 'google')}>
                                <i className="fab fa-google"/>
                            </a>
                        </div>
                    </div>
                    <footer className="ch-login-form__footer">
                        <span className="ch-login-form__text-content ch-login-form__footer-content">Or Sign Up Using</span>
                        <Link to="/registration" className="ch-login-form__link">SIGN UP</Link>
                    </footer>
                </form>
            </div>
        );
    }
}

SignInPage.propTypes = propTypes;

export default SignInPage;
