import { configureStore } from "@reduxjs/toolkit"
import checkSlice from "./check-slice"
// import loaderSlice from "./loader-slice";
import newSlice from "./new-slice";

const store = configureStore({
    reducer: {
        check: checkSlice.reducer,
        uncheck: checkSlice.reducer,
        new: newSlice.reducer,
        prev: newSlice.reducer,
        // loader: loaderSlice.reducer,
        // unloder: loaderSlice.reducer
    }
})

export default store;