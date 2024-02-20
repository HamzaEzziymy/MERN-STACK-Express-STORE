import {configureStore} from "@reduxjs/toolkit";
import slice from "./slice";


const store = configureStore({
    reducer: {
        database: slice
    }
})

export default store;