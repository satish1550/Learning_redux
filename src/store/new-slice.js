import { createSlice } from "@reduxjs/toolkit"

const newSlice = createSlice({
    name: "check",
    initialState: { isNew: true },
    reducers: {
        new(state) {
            state.isNew = false
        },
        prev(state) {
            state.isNew = true
        }
    }
})
export const newActions = newSlice.actions;

export default newSlice;