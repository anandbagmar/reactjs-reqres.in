import React from "react";
import App from "./App";
import ReactDOM from "react-dom";
import {configure, shallow,mount} from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import {Provider as ReduxProvider} from "react-redux";
import {store} from "./store";
import {BrowserRouter} from "react-router-dom";

configure ({adapter : new Adapter()})
describe('AppBundle', () => {
    test('renders without crashing', () => {
        const AppBundle = (
            <ReduxProvider store={store}>
                <BrowserRouter >
                    <App />
                </BrowserRouter>
            </ReduxProvider>
        );
        const div = document.createElement("div");
        ReactDOM.render(AppBundle, div);
    });
});
describe('<App />', () => {
    test('renders without crashing', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.exists()).toBe(true)
    });
});