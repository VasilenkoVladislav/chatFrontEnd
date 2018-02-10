import { shallow, mount } from 'enzyme';
import React from 'react';
import { shallowWithStore } from '../testsHelper';
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
            const component = shallowWithStore(<SignInPageContainer/>, initialState);
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
        it('should call oAuthSignIn, if click social network icon', () => {
            const component = mount(<SignInPage {...props} {...propsFunc} />);
            const socialIcon = component.find('.facebook');
            socialIcon.simulate('click');
            expect(propsFunc.oAuthSignIn).toHaveBeenCalledTimes(1);
            // #Todo check arguments callee
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
    });
});
