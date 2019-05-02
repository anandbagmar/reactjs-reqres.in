import React from "react";
import {configure, shallow} from "enzyme"
import Adapter from "enzyme-adapter-react-16"

import PublicHead from "./index";

configure ({adapter : new Adapter()})
const sample_title = "sample title";
describe('<PublicHead />', () => {
    test('renders', () => {
        const wrapper = shallow(<PublicHead title={sample_title}/>);
        expect(wrapper.exists()).toBe(true)
    });
    test('should render title as title props', () => {
        const wrapper = shallow(<PublicHead title={sample_title}/>);
        expect(wrapper.find('title').text()).toEqual(sample_title)
    });
});