import React from "react";
import * as actions from "./actions";
import * as constants from "./constants";

describe('add actions', () => {
    test('should create an action to create a user', () => {
        const my_sample_first_name = "my sample first name";
        const my_sample_last_name = "my sample last name";
        const my_sample_avatar = "http://example.com/image.png";
        const expectedAction = {
            type: constants.SET,
            payload: {
                first_name:my_sample_first_name,
                last_name:my_sample_last_name,
                avatar:my_sample_avatar
            }
        }
        expect(actions.set(my_sample_first_name,my_sample_last_name,my_sample_avatar)).toEqual(expectedAction)
    });
    test('should create an action to set failure status', () => {
        const message = "sample message";
        const expectedAction = {
            type: constants.FAILURE,
            payload: {
                failure : true,
                message :message
            },
        }
        expect(actions.failure(true,message)).toEqual(expectedAction)
    });
    test('should create an action to set loading status', () => {
        const expectedAction = {
            type: constants.LOADING,
            payload: {
                loading : true,
            },
        }
        expect(actions.loading(true)).toEqual(expectedAction)
    });
});