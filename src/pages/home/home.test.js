import React from "react";
import Home from "./home";
import {configure, shallow} from "enzyme"
import Adapter from "enzyme-adapter-react-16"

configure ({adapter : new Adapter()})
describe('<Home />', () => {
    test('renders connected', () => {
        const wrapper = shallow(<Home />);
        expect(wrapper.exists()).toBe(true)
    });
});