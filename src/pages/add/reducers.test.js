import React from "react";
import  reducers  from "./reducers";
import * as constants from "./constants";

const initial ={
    failure:false,
    loading:false,
}

describe('add reducers', () => {
    test('should return the initial state', () => {
        expect(reducers(undefined, {}))
            .toEqual(initial)
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
});