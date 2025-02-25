import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import favReducer from './favoriteSlice';
import checkoutReducer from './checkoutSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        fav : favReducer,
        checkout: checkoutReducer
    },
});

export default store;