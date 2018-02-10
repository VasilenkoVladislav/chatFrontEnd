import { shallow, mount } from 'enzyme';
import React from 'react';
import RegistrationPage from 'components/RegistrationPage/RegistrationPage';
import RegistrationPageContainer from 'components/RegistrationPage';
import { shallowWithStore } from '../testsHelper';

describe('RegistrationPage component test', () => {
    describe('RegistrationPageContainer', () => {
        const initialState = { };
        it('renders without crashing', () => {
            const component = shallowWithStore(<RegistrationPageContainer/>, initialState);
            expect(component).toMatchSnapshot();
        });
        it('should render self', () => {
            const component = shallowWithStore(<RegistrationPageContainer/>, initialState);
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
    });
});
