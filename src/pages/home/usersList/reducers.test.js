import React from "react";
import  reducers  from "./reducers";
import * as constants from "./constants";

const initial ={
    data:[],
    failure:false,
    loading:false,
    delete_failure:false,
    delete_loading:false,
    next_page:1,
    total_pages:1
}
describe('login reducers', () => {
    test('should return the initial state', () => {
        expect(reducers(undefined, {}))
            .toEqual(initial)
    });
    test(`should handel ${constants.SET}`, () => {
        expect(reducers({},{type:constants.SET,payload:{data : 'my data'}}))
            .toEqual({data : 'my data'})
    });
    test(`should handel ${constants.SET_TOTAL}`, () => {
        expect(reducers({},{type:constants.SET_TOTAL,payload:{total_pages : 1024}}))
            .toEqual({total_pages : 1024})
    });
    test(`should handel ${constants.SET_NEXT_PAGE}`, () => {
        expect(reducers({},{type:constants.SET_NEXT_PAGE,payload:{next_page : 1024}}))
            .toEqual({next_page : 1024})
    });
    test(`should handel ${constants.FAILURE}`, () => {
        expect(reducers({},{type:constants.FAILURE,payload:{failure : true,message:"sample message"}}))
            .toEqual({failure : true,message:"sample message"})
        expect(reducers({},{type:constants.FAILURE,payload:{failure : false,message:"another sample message"}}))
            .toEqual({failure : false,message:"another sample message"})
    });
    test(`should handel ${constants.LOADING}`, () => {
        expect(reducers({},{type:constants.LOADING,payload:{loading : true}}))
            .toEqual({loading : true})
        expect(reducers({},{type:constants.LOADING,payload:{loading : false}}))
            .toEqual({loading : false})
    });
    test(`should handel ${constants.DELETE_ITEM_FAILURE}`, () => {
        expect(reducers({},{type:constants.DELETE_ITEM_FAILURE,payload:{failure : true,message:"sample message"}}))
            .toEqual({failure : true,message:"sample message"})
        expect(reducers({},{type:constants.DELETE_ITEM_FAILURE,payload:{failure : false,message:"another sample message"}}))
            .toEqual({failure : false,message:"another sample message"})
    });
    test(`should handel ${constants.LOADING}`, () => {
        expect(reducers({},{type:constants.DELETE_ITEM_LOADING,payload:{loading : true}}))
            .toEqual({loading : true})
        expect(reducers({},{type:constants.DELETE_ITEM_LOADING,payload:{loading : false}}))
            .toEqual({loading : false})
    });
});