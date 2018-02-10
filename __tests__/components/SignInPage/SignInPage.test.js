import { shallow, mount } from 'enzyme';
import { shallowWithStore, mountWithStore } from '../testsHelper';
import React from 'react';
import SignInPage from 'components/SignInPage/SignInPage';
import SignInPageContainer from 'components/SignInPage';

describe('SignPage component test', () => {
    describe('SignPageContainer', () => {
        const initialState = { };
        it('renders without crashing', () => {
            const component = shallowWithStore(<SignInPageContainer/>, initialState);
            expect(component).toMatchSnapshot();
        });
        it('should render self', () => {
            const component = mountWithStore(<SignInPageContainer/>, initialState);
            expect(component).toHaveLength(1);
        });
    });
    describe('SignPage', () => {
        let props = null;
        let propsFunc = null;
        beforeEach(() => {
            props = {
                isLoading: false
            };
            propsFunc = {
                oAuthSignIn: jest.fn(),
                signIn: jest.fn()
            };
        });
        it('renders without crashing', () => {
            const component = shallow(<SignInPage {...props} {...propsFunc} />);
            expect(component).toMatchSnapshot();
        });
        it('should render self', () => {
            const component = mount(<SignInPage {...props} {...propsFunc} />);
            expect(component).toHaveLength(1);
        });
        it('should call signIn and preventDefault if click button singIn and form valid', () => {
            const component = mount(<SignInPage {...props} {...propsFunc} />);
            component.setState({ formValid: true });
            const button = component.find('.ch-login-form-button');
            const event = {
                preventDefault: jest.fn()
            };
            button.simulate('click', event);
            expect(propsFunc.signIn).toHaveBeenCalledTimes(1);
            expect(event.preventDefault).toHaveBeenCalledTimes(1);
        });
        it('should not call signIn, call preventDefault if click button singIn and form not valid', () => {
            const component = mount(<SignInPage {...props} {...propsFunc} />);
            const button = component.find('.ch-login-form-button');
            const event = {
                preventDefault: jest.fn()
            };
            button.simulate('click', event);
            expect(propsFunc.signIn).toHaveBeenCalledTimes(0);
            expect(event.preventDefault).toHaveBeenCalledTimes(1);
        });
        it('should call signIn with arguments email and password if click button singIn and form valid', () => {
            const component = mount(<SignInPage {...props} {...propsFunc} />);
            component.setState({ email: 'v@v.com', password: 'aa123456', formValid: true });
            const button = component.find('.ch-login-form-button');
            const event = {
                preventDefault: jest.fn()
            };
            button.simulate('click', event);
            expect(propsFunc.signIn.mock.calls[0][0]).toEqual('v@v.com');
            expect(propsFunc.signIn.mock.calls[0][1]).toEqual('aa123456');
        });
        it('should reset state email and password after call signIn if form valid', () => {
            const component = mount(<SignInPage {...props} {...propsFunc} />);
            component.setState({ email: 'v@v.com', password: 'aa123456', formValid: true });
            const button = component.find('.ch-login-form-button');
            const event = {
                preventDefault: jest.fn()
            };
            button.simulate('click', event);
            expect(component.state('email')).toEqual('');
            expect(component.state('password')).toEqual('');
        });
        it('should call oAuthSignIn, if click social network icon', () => {
            const component = mount(<SignInPage {...props} {...propsFunc} />);
            const socialIcon = component.find('.facebook');
            socialIcon.simulate('click');
            expect(propsFunc.oAuthSignIn).toHaveBeenCalledTimes(1);
        });
        it('should call oAuthSignIn with arguments facebook, if click social network icon facebook', () => {
            const component = mount(<SignInPage {...props} {...propsFunc} />);
            const socialIcon = component.find('.facebook');
            socialIcon.simulate('click');
            expect(propsFunc.oAuthSignIn.mock.calls[0][0]).toEqual('facebook');
        });
        it('should call oAuthSignIn with arguments twitter, if click social network icon twitter', () => {
            const component = mount(<SignInPage {...props} {...propsFunc} />);
            const socialIcon = component.find('.twitter');
            socialIcon.simulate('click');
            expect(propsFunc.oAuthSignIn.mock.calls[0][0]).toEqual('twitter');
        });
        it('should call oAuthSignIn with arguments google, if click social network icon google', () => {
            const component = mount(<SignInPage {...props} {...propsFunc} />);
            const socialIcon = component.find('.google');
            socialIcon.simulate('click');
            expect(propsFunc.oAuthSignIn.mock.calls[0][0]).toEqual('google');
        });
        it('should change input if simulate onChange input', () => {
            const component = mount(<SignInPage {...props} {...propsFunc} />);
            const input = component.find('[type="email"]');
            const event = {
                target: {
                    name: 'email',
                    value: 'test'
                }
            };
            input.simulate('change', event);
            expect(component.state('email')).toEqual('test');
        });
        it('should return emailValid true if email valid', () => {
            const component = mount(<SignInPage {...props} {...propsFunc} />);
            component.instance().validateField('email', 'v@v.com');
            expect(component.state('emailValid')).toEqual(true);
        });
        it('should return emailValid false if email invalid', () => {
            const component = mount(<SignInPage {...props} {...propsFunc} />);
            component.instance().validateField('email', 'v@v');
            expect(component.state('emailValid')).toEqual(false);
        });
        it('should return passwordValid true if password valid', () => {
            const component = mount(<SignInPage {...props} {...propsFunc} />);
            component.instance().validateField('password', 'aa123456');
            expect(component.state('passwordValid')).toEqual(true);
        });
        it('should return passwordValid false if password invalid', () => {
            const component = mount(<SignInPage {...props} {...propsFunc} />);
            component.instance().validateField('password', 'aa123');
            expect(component.state('passwordValid')).toEqual(false);
        });
        it('should return current state if fieldName not exist ', () => {
            const component = mount(<SignInPage {...props} {...propsFunc} />);
            component.setState({emailValid: true, passwordValid: true, formValid: true });
            component.instance().validateField('some field', 'test');
            expect(component.state('formValid')).toEqual(true);
            expect(component.state('emailValid')).toEqual(true);
            expect(component.state('passwordValid')).toEqual(true);
        });
    });
});
