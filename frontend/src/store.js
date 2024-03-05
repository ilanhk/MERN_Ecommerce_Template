import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import cartSliceReducer from "./slices/cartSlice";
import authSliceRedcuer from "./slices/authSlice"; //not a child of the apiSlice

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer, //the value of apiSlice.reducer will be apiSlice.reducerPath
        cart: cartSliceReducer,
        auth: authSliceRedcuer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true, 
});
//reducer attribute to add all reducers


export default store;