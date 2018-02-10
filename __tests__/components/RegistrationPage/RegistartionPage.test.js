import { shallow, mount } from 'enzyme';
import { shallowWithStore, mountWithStore } from '../testsHelper';
import React from 'react';
import RegistrationPage from 'components/RegistrationPage/RegistrationPage';
import RegistrationPageContainer from 'components/RegistrationPage';

describe('RegistrationPage component test', () => {
    describe('RegistrationPageContainer', () => {
        const initialState = { };
        it('renders without crashing', () => {
            const component = shallowWithStore(<RegistrationPageContainer/>, initialState);
            expect(component).toMatchSnapshot();
        });
        it('should render self', () => {
            const component = mountWithStore(<RegistrationPageContainer/>, initialState);
            expect(component).toHaveLength(1);
        });
    });
    describe('RegistrationPage', () => {
        let props = null;
        let propsFunc = null;
        beforeEach(() => {
            props = {
                isLoading: false
            };
            propsFunc = {
                registration: jest.fn()
            };
        });
        it('renders without crashing', () => {
            const component = shallow(<RegistrationPage {...props} {...propsFunc} />);
            expect(component).toMatchSnapshot();
        });
        it('should render self', () => {
            const component = mount(<RegistrationPage {...props} {...propsFunc} />);
            expect(component).toHaveLength(1);
        });
        it('should call registration and preventDefault if click button registration and form valid', () => {
            const component = mount(<RegistrationPage {...props} {...propsFunc} />);
            component.setState({ formValid: true });
            const button = component.find('.ch-registration-form-button');
            const event = {
                preventDefault: jest.fn()
            };
            button.simulate('click', event);
            expect(propsFunc.registration).toHaveBeenCalledTimes(1);
            expect(event.preventDefault).toHaveBeenCalledTimes(1);
        });
        it('should not call registration, call preventDefault if click button registration and form not valid', () => {
            const component = mount(<RegistrationPage {...props} {...propsFunc} />);
            const button = component.find('.ch-registration-form-button');
            const event = {
                preventDefault: jest.fn()
            };
            button.simulate('click', event);
            expect(propsFunc.registration).toHaveBeenCalledTimes(0);
            expect(event.preventDefault).toHaveBeenCalledTimes(1);
        });
        it('should call registration with arguments email,name, password and confirm_password if click button registration and form valid', () => {
            const component = mount(<RegistrationPage {...props} {...propsFunc} />);
            component.setState({
                email: 'v@v.com',
                userName: 'Vladislav',
                password: 'aa123456',
                confirmPassword: 'aa123456',
                formValid: true
            });
            const button = component.find('.ch-registration-form-button');
            const event = {
                preventDefault: jest.fn()
            };
            const expectedValue = {
                email: 'v@v.com',
                name: 'Vladislav',
                password: 'aa123456',
                confirm_password: 'aa123456'
            };
            button.simulate('click', event);
            expect(propsFunc.registration.mock.calls[0][0]).toEqual(expectedValue);
        });
        it('should reset state email and password after call signIn if form valid', () => {
            const component = mount(<RegistrationPage {...props} {...propsFunc} />);
            component.setState({
                email: 'v@v.com',
                userName: 'Vladislav',
                password: 'aa123456',
                confirmPassword: 'aa123456',
                formValid: true
            });
            const button = component.find('.ch-registration-form-button');
            const event = {
                preventDefault: jest.fn()
            };
            button.simulate('click', event);
            expect(component.state('email')).toEqual('');
            expect(component.state('userName')).toEqual('');
            expect(component.state('password')).toEqual('');
            expect(component.state('confirmPassword')).toEqual('');
        });
        it('should change input if simulate onChange input', () => {
            const component = mount(<RegistrationPage {...props} {...propsFunc} />);
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
            const component = mount(<RegistrationPage {...props} {...propsFunc} />);
            component.instance().validateField('email', 'v@v.com');
            expect(component.state('emailValid')).toEqual(true);
        });
        it('should return emailValid false if email invalid', () => {
            const component = mount(<RegistrationPage {...props} {...propsFunc} />);
            component.instance().validateField('email', 'v@v');
            expect(component.state('emailValid')).toEqual(false);
        });
        it('should return userNameValid true if userNameValid valid', () => {
            const component = mount(<RegistrationPage {...props} {...propsFunc} />);
            component.instance().validateField('userName', 'Vladislav');
            expect(component.state('userNameValid')).toEqual(true);
        });
        it('should return userNameValid false if userNameValid invalid', () => {
            const component = mount(<RegistrationPage {...props} {...propsFunc} />);
            component.instance().validateField('userName', 'v@v');
            expect(component.state('userNameValid')).toEqual(false);
        });
        it('should return passwordValid true if password valid', () => {
            const component = mount(<RegistrationPage {...props} {...propsFunc} />);
            component.instance().validateField('password', 'aa123456');
            expect(component.state('passwordValid')).toEqual(true);
        });
        it('should return passwordValid false if password invalid', () => {
            const component = mount(<RegistrationPage {...props} {...propsFunc} />);
            component.instance().validateField('password', 'aa123');
            expect(component.state('passwordValid')).toEqual(false);
        });
        it('should return confirmPasswordValid true if password and confirmPassword equal', () => {
            const component = mount(<RegistrationPage {...props} {...propsFunc} />);
            component.setState({ password: 'aa123456', confirmPassword: 'aa123456' });
            component.instance().validateField('password', 'aa123456');
            expect(component.state('confirmPasswordValid')).toEqual(true);
        });
        it('should return confirmPasswordValid false if password and confirmPassword not equal', () => {
            const component = mount(<RegistrationPage {...props} {...propsFunc} />);
            component.setState({ password: 'aa123456', confirmPassword: 'aa123' });
            component.instance().validateField('password', 'aa123');
            expect(component.state('confirmPasswordValid')).toEqual(false);
        });
        it('should return confirmPasswordValid true if confirmPassword and password equal', () => {
            const component = mount(<RegistrationPage {...props} {...propsFunc} />);
            component.setState({ password: 'aa123456', confirmPassword: 'aa123456' });
            component.instance().validateField('confirmPassword', 'aa123456');
            expect(component.state('confirmPasswordValid')).toEqual(true);
        });
        it('should return confirmPasswordValid false if confirmPassword and password not equal', () => {
            const component = mount(<RegistrationPage {...props} {...propsFunc} />);
            component.setState({ password: 'aa123456', confirmPassword: 'aa123' });
            component.instance().validateField('confirmPassword', 'aa123');
            expect(component.state('confirmPasswordValid')).toEqual(false);
        });
        it('should return current state if fieldName not exist ', () => {
            const component = mount(<RegistrationPage {...props} {...propsFunc} />);
            component.setState({
                emailValid: true,
                userNameValid: true,
                passwordValid: true,
                confirmPasswordValid: true,
                formValid: true
            });
            component.instance().validateField('some field', 'test');
            expect(component.state('formValid')).toEqual(true);
            expect(component.state('emailValid')).toEqual(true);
            expect(component.state('userNameValid')).toEqual(true);
            expect(component.state('passwordValid')).toEqual(true);
            expect(component.state('confirmPasswordValid')).toEqual(true);
        });
    });
});
