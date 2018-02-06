import './SignInPage.scss';
import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

const propTypes = {
    isLoading: PropTypes.bool.isRequired,
    signIn: PropTypes.func.isRequired
};

class SignInPage extends Component {
    constructor (props) {
        super(props);
        this.state = { emailValue: '', passwordValue: '' };
    }
    signInOnClick = () => {
        this.props.signIn(this.state.emailValue, this.state.passwordValue);
        this.setState({ emailValue: '', passwordValue: '' });
    };
    handleChangeEmailInput = (event) => {
        this.setState({ emailValue: event.target.value });
    };
    handleChangePasswordInput = (event) => {
        this.setState({ passwordValue: event.target.value });
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
                                maxLength={30}
                                value={this.state.emailValue}
                                onChange={this.handleChangeEmailInput}/>
                        </div>
                        <div className="ch-login-form__input-wrap">
                            <span className="ch-login-form__label">Password</span>
                            <i className="ch-login-form__icon fas fa-lock"/>
                            <input type="password"
                                className="ch-login-form__input"
                                placeholder="Type your password"
                                maxLength={30}
                                value={this.state.passwordValue}
                                onChange={this.handleChangePasswordInput}/>
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
                            <a href="#" className="ch-login-form__social-link ch-login-form__social-link_facebook">
                                <i className="fab fa-facebook-f"/>
                            </a>
                            <a href="#" className="ch-login-form__social-link ch-login-form__social-link_twitter">
                                <i className="fab fa-twitter"/>
                            </a>
                            <a href="#" className="ch-login-form__social-link ch-login-form__social-link_google">
                                <i className="fab fa-google"/>
                            </a>
                        </div>
                    </div>
                    <footer className="ch-login-form__footer">
                        <span className="ch-login-form__text-content ch-margin-bottom-big">Or Sign Up Using</span>
                        <Link to="/registration" className="ch-login-form__link">SIGN UP</Link>
                    </footer>
                </form>
            </div>
        );
    }
}

SignInPage.propTypes = propTypes;

export default SignInPage;
