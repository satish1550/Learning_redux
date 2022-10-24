import { configureStore } from "@reduxjs/toolkit"
import checkSlice from "./check-slice"

const store = configureStore({
    reducer: {
        check: checkSlice.reducer,
        uncheck: checkSlice.reducer
    }
})

export default store