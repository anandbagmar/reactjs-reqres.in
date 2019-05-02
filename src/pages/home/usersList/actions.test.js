import React from "react";
import * as actions from "./actions";
import * as constants from "./constants";

describe('UserList actions', () => {
    test('should create an action to get query', () => {
        const expectedAction = {
            type: constants.GET,
            payload: {
                query : "query"
            },
        }
        expect(actions.get("query")).toEqual(expectedAction)
    });
    test('should create an action to set data', () => {
        const expectedAction = {
            type: constants.SET,
            payload: {
                data : ["data"]
            },
        }
        expect(actions.set(["data"])).toEqual(expectedAction)
    });
    test('should create an action to set total data', () => {
        const expectedAction = {
            type: constants.SET_TOTAL,
            payload: {
                total_pages : 30
            },
        }
        expect(actions.setTotal(30)).toEqual(expectedAction)
    });
    test('should create an action to next page id', () => {
        const expectedAction = {
            type: constants.SET_NEXT_PAGE,
            payload: {
                next_page : 5
            },
        }
        expect(actions.setNextPage(5)).toEqual(expectedAction)
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
    test('should create an action to set deleting an item failure status', () => {
        const message = "sample message";
        const expectedAction = {
            type: constants.DELETE_ITEM_FAILURE,
            payload: {
                delete_failure : true,
                delete_message :message
            },
        }
        expect(actions.deleteItemFailure(true,message)).toEqual(expectedAction)
    });
    test('should create an action to set  deleting an item  loading status', () => {
        const expectedAction = {
            type: constants.DELETE_ITEM_LOADING,
            payload: {
                delete_loading : true,
            },
        }
        expect(actions.deleteItemLoading(true)).toEqual(expectedAction)
    });
});