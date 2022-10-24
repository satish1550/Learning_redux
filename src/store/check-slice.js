import { createSlice } from "@reduxjs/toolkit"

const checkSlice = createSlice({
    name: "check",
    initialState: { isCheck: false },
    reducers: {
        check(state) {
            state.isCheck = true
        },
        uncheck(state) {
            state.isCheck = false
        }

    }
})
export const checkActions = checkSlice.actions;

export default checkSlice;