import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "../LocalStorage/LocalStorage";

const initialState = {
    products: getLocalStorage('carts') || [],
    favorites: getLocalStorage('favorites') || [],
    totalPrice: 0,
    loading: false,
    error: null
};

export const addToCartAsync = createAsyncThunk(
    'cart/addToCartAsync',
    async (payload) => {
        try {
            const response = await fetch(`https://server.ztfbooks.com/client/v1/cart?ebookId=${payload.ebookId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${payload.token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to add to cart');
            }
            return await response.json();
        } catch (error) {
            throw error;
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { id, quantity, name, price } = action.payload;
            const indexedProductID = (state.products).findIndex(pro => pro.id === id);
            if (indexedProductID >= 0) {
                state.products[indexedProductID].quantity += quantity;
            } else {
                state.products.push({ id, quantity, name, price });
            }
            setLocalStorage('carts', state.products);
            state.totalPrice = state.products.reduce((sum, product) => 
                sum + product.quantity * product.price, 0
            );
        },

        toggleFavorite: (state, action) => {
            const { id, name, price } = action.payload;
            const existingIndex = state.favorites.findIndex(item => item.id === id);
            
            if (existingIndex >= 0) {
                state.favorites = state.favorites.filter(item => item.id !== id);
            } else {
                state.favorites.push({ id, name, price });
            }
            setLocalStorage('favorites', state.favorites);
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
    extraReducers: (builder) => {
        builder
            .addCase(addToCartAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCartAsync.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(addToCartAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { addToCart, changeQuantity, removeItem, toggleFavorite } = cartSlice.actions;
export default cartSlice.reducer;