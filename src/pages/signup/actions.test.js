import React from "react";
import * as actions from "./actions";
import * as constants from "./constants";

describe('signup actions', () => {
    test('should create an action to attempt signup', () => {
        const my_sample_email = "email@example.com";
        const my_sample_password = "my sample password";
        const expectedAction = {
            type: constants.ATTEMPT,
            payload: {
                params : {email:my_sample_email,password:my_sample_password}
            },
        }
        expect(actions.attempt(my_sample_email,my_sample_password)).toEqual(expectedAction)
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