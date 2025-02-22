import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "../LocalStorage/LocalStorage";
import axios from "axios";

const initialState = {
    products: getLocalStorage('carts') || [],
    totalPrice: 0,
    loading: false,
    error: null
};


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        addToCart: (state, action) => {
            const { ebookId, quantity, name, price } = action.payload;

            if (!state.products) {
                state.products = []; // Ensure products array is initialized
            }

            const indexedProductID = state.products.findIndex(pro => pro.id === ebookId);

            if (indexedProductID >= 0) {
                console.warn("Item is already in the cart");
                return; // <-- You can keep this or remove it
            }

            // Add the product if it doesn't exist in the cart
            state.products.push({ id: ebookId, quantity, name, price });

            // ✅ Save the updated cart array
            setLocalStorage("carts", [...state.products]);

            // ✅ Update total price
            state.totalPrice = state.products.reduce(
                (sum, product) => sum + product.quantity * product.price,
                0
            );
        },





        changeQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const indexedProductID = (state.products).findIndex(pro => pro.id === id);
            if (quantity > 0) {
                state.products[indexedProductID].quantity = quantity;
            } else {
                state.products = (state.products).filter(pro => pro.id !== id);
            }
            setLocalStorage('carts', state.products);
            state.totalPrice = state.products.reduce((sum, product) =>
                sum + product.quantity * product.price, 0
            );
        },

        removeItem: (state, action) => {
            const id = action.payload;
            const indexedProductID = (state.products).findIndex(pro => pro.id === id);
            if (indexedProductID >= 0) {
                state.products = (state.products).filter(pro => pro.id !== id);
                setLocalStorage('carts', state.products);
                state.totalPrice = state.products.reduce((sum, product) =>
                    sum + product.quantity * product.price, 0
                );
            }
        },
    },

});

export const { addToCart, changeQuantity, removeItem, toggleFavorite } = cartSlice.actions;
export default cartSlice.reducer;