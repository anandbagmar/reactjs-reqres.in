import React from "react";
import ConnectedSignup , {Signup} from "./signup";
import {configure, shallow} from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { store } from "../../store";
import * as constants from "./constants";

configure ({adapter : new Adapter()})
const my_sample_email = "email@example.com";
const my_sample_password = "my sample password";
describe('<Signup />', () => {
    test('renders connected', () => {
        const wrapper = shallow(<ConnectedSignup store={store}/>);
        expect(wrapper.exists()).toBe(true)
    });
    test('should change button text and disability by changing loading props', () => {
        const wrapper = shallow(<Signup />);
        wrapper.setProps({loading : true});
        expect(wrapper.find('.form-btn').text()).toBe(' loading ...');
        expect(wrapper.find('.form-btn').props().disabled).toBe(true);
        wrapper.setProps({loading : false});
        expect(wrapper.find('.form-btn').text()).toBe('Signup');
        expect(wrapper.find('.form-btn').props().disabled).toBe(false);
    });
    test('should set states on change inputs', () => {
        const wrapper = shallow(<Signup />);
        wrapper.find('input[name="email"]').simulate('change',{target: {name: "email", value: my_sample_email}});
        expect(wrapper.state().email).toBe(my_sample_email);
        wrapper.find('input[name="password"]').simulate('change',{target: {name: "password", value: my_sample_password}});
        expect(wrapper.state().password).toBe(my_sample_password);
        wrapper.find('input[name="repassword"]').simulate('change',{target: {name: "repassword", value: my_sample_password}});
        expect(wrapper.state().repassword).toBe(my_sample_password);
    });
    test('should set submitted states on submit form', () => {
        const wrapper = shallow(<Signup />);
        wrapper.find('form').simulate('submit', {preventDefault: () => {},target: [], });
        expect(wrapper.state().submitted).toBe(true);
    });
    test('should stop submiting form if values are invalid', () => {
        const wrapper = shallow(<Signup />);
        wrapper.find('form').simulate('submit', {preventDefault: () => {},target: [], });
        expect(wrapper.find('.error-block.email').exists()).toBe(true);
        expect(wrapper.find('.error-block.password').exists()).toBe(true);
        expect(wrapper.find('.error-block.repassword').exists()).toBe(true);
    });
    test('should check Passwords match ', () => {
        const wrapper = shallow(<Signup />);
        wrapper.find('input[name="password"]').simulate('change',{target: {name: "password", value: my_sample_password}});
        wrapper.find('input[name="repassword"]').simulate('change',{target: {name: "repassword", value: "unknown"}});
        wrapper.find('form').simulate('submit', {preventDefault: () => {},target: [], });
        expect(wrapper.find('.error-block.repassword').exists()).toBe(true);
        expect(wrapper.find('.error-block.repassword').text()).toEqual("Passwords don't match");
    });
    test('should dispatch attemt action ', () => {
        const wrapper = shallow(<ConnectedSignup store={store} />);
        expect(wrapper.props().attempt(my_sample_email,my_sample_password))
            .toEqual({type: constants.ATTEMPT,payload: {params : {email:my_sample_email,password:my_sample_password}}});
    });
});