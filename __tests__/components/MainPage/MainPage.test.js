import { shallow, mount } from 'enzyme';
import MainPage from 'components/MainPage';
import React from 'react';

describe('MainPage component test', () => {
    it('renders without crashing', () => {
        const component = shallow(<MainPage/>);
        expect(component).toMatchSnapshot();
    });
    it('should render self', () => {
        const component = mount(<MainPage/>);
        expect(component).toHaveLength(1);
    });
});
