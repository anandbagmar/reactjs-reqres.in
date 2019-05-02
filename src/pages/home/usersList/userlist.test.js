import React from "react";
import ConnectedUsersList , {UsersList} from "./usersList";
import {configure, shallow , mount} from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { store } from "../../../store";

configure ({adapter : new Adapter()})
const mockData = [
    {
        id: 10,
        first_name: "Byron",
        last_name: "Fields",
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/russoedu/128.jpg"
    },
    {
        id: 11,
        first_name: "George",
        last_name: "Edwards",
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/mrmoiree/128.jpg"
    }
];
describe('<UsersList />', () => {
    test('renders connected', () => {
        const wrapper = shallow(<ConnectedUsersList store={store}/>);
        expect(wrapper.exists()).toBe(true)
    });
    test('should show or hide .try_again button when loading & failure props changes', () => {
        const wrapper = shallow(<UsersList  loading={true} failure={false}/>)
        expect(wrapper.find('.try_again').exists()).toBe(false)
        wrapper.setProps({loading:false,failure:false})
        expect(wrapper.find('.try_again').exists()).toBe(false)
        wrapper.setProps({loading:true,failure:true})
        expect(wrapper.find('.try_again').exists()).toBe(false)
        wrapper.setProps({loading:false,failure:true})
        expect(wrapper.find('.try_again').exists()).toBe(true)
    });
    test('should show or hide .load_more button when loading & total_pages & next_page props changes', () => {
        const wrapper = shallow(<UsersList  loading={true} />)
        expect(wrapper.find('.load_more').exists()).toBe(false)
        wrapper.setProps({loading:false,total_pages:20,next_page:20})
        expect(wrapper.find('.load_more').exists()).toBe(true)
        wrapper.setProps({loading:false,total_pages:20,next_page:21})
        expect(wrapper.find('.load_more').exists()).toBe(false)
    });
    test('should show or hide loading  when loading props changes', () => {
        const wrapper = mount(<UsersList  loading={true} />)
        expect(wrapper.find('#loading').exists()).toBe(true)
        wrapper.setProps({loading:false})
        expect(wrapper.find('#loading').exists()).toBe(false)
    });
    test('should render users with mock data', () => {
        const wrapper = shallow(<UsersList  loading={false} data={mockData} />)
        expect(wrapper.find('.lastname').length).toEqual(mockData.length)
        expect(wrapper.find('.firstname').get(1).props.children).toEqual(mockData[1].first_name)
        expect(wrapper.find('.lastname').get(0).props.children).toEqual(mockData[0].last_name)
    });
});