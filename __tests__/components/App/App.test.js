import { shallow, mount } from 'enzyme';
import App from 'components/App';
import React from 'react';

describe('App component test', () => {
    it('renders without crashing', () => {
        const component = shallow(<App/>);
        expect(component).toMatchSnapshot();
    });
    it('should render self', () => {
        const component = mount(<App/>);
        expect(component).toHaveLength(1);
    });
});
