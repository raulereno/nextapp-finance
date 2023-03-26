import { createSlice } from "@reduxjs/toolkit";

interface TestSlice {
    products: string[];
}

const initialState: TestSlice = {
    products: []
}

export const TestSlice = createSlice({
    name: "TestSlice",
    initialState: initialState,
    reducers: {}

})

//ACTIONS

export const action = () => (dispatch : Function) => {
   // return dispatch(...)
}

export default TestSlice.reducer;