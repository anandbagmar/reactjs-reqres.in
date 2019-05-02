import React from "react";
import ConnectedAdd , {Add} from "./add";
import {configure, shallow} from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { store } from "../../store";
import * as constants from "./constants";

configure ({adapter : new Adapter()})
const my_sample_first_name = "my sample first name";
const my_sample_last_name = "my sample last name";
const my_sample_avatar = "http://example.com/image.png";
describe('<Add />', () => {
    test('renders connected', () => {
        const wrapper = shallow(<ConnectedAdd store={store}/>);
        expect(wrapper.exists()).toBe(true)
    });
    test('should change button text and disability by changing loading props', () => {
        const wrapper = shallow(<Add />);
        wrapper.setProps({loading : true});
        expect(wrapper.find('.form-btn').text()).toBe(' loading ...');
        expect(wrapper.find('.form-btn').props().disabled).toBe(true);
        wrapper.setProps({loading : false});
        expect(wrapper.find('.form-btn').text()).toBe('Save');
        expect(wrapper.find('.form-btn').props().disabled).toBe(false);
    });
    test('should set states on change inputs', () => {
        const wrapper = shallow(<Add />);
        wrapper.find('input[name="first_name"]').simulate('change',{target: {name: "first_name", value: my_sample_first_name}});
        expect(wrapper.state().first_name).toBe(my_sample_first_name);
        wrapper.find('input[name="last_name"]').simulate('change',{target: {name: "last_name", value: my_sample_last_name}});
        expect(wrapper.state().last_name).toBe(my_sample_last_name);
        wrapper.find('input[name="avatar"]').simulate('change',{target: {name: "avatar", value: my_sample_avatar}});
        expect(wrapper.state().avatar).toBe(my_sample_avatar);
    });
    test('should set submitted states on submit form', () => {
        const wrapper = shallow(<Add />);
        wrapper.find('form').simulate('submit', {preventDefault: () => {},target: [], });
        expect(wrapper.state().submitted).toBe(true);
    });
    test('should stop submiting form if values are invalid', () => {
        const wrapper = shallow(<Add />);
        wrapper.find('form').simulate('submit', {preventDefault: () => {},target: [], });
        expect(wrapper.find('.error-block.first_name').exists()).toBe(true);
        expect(wrapper.find('.error-block.last_name').exists()).toBe(true);
        expect(wrapper.find('.error-block.avatar').exists()).toBe(true);
    });
    test('should dispatch set action ', () => {
        const wrapper = shallow(<ConnectedAdd store={store} />);
        expect(wrapper.props().set(my_sample_first_name,my_sample_last_name,my_sample_avatar))
            .toEqual({type: constants.SET,payload:  {first_name:my_sample_first_name,last_name:my_sample_last_name,avatar:my_sample_avatar}});
    });

});