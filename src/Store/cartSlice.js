import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getLocalStorage } from "../LocalStorage/LocalStorage";

export const fetchCartItems = createAsyncThunk("cart/fetchCartItems", async (_, { rejectWithValue }) => {
    try {
        const token = getLocalStorage("userdata")?.jwtToken;
        if (!token) return rejectWithValue("No token found");
        const response = await axios.get("https://server.ztfbooks.com/client/v1/cart", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (ebookId, { rejectWithValue }) => {

        try {
            const token = getLocalStorage("userdata")?.jwtToken;

            if (!token) return rejectWithValue("Please login first");

            // ✅ Send `ebookId` as a query parameter
            const response = await axios.post(
                `https://server.ztfbooks.com/client/v1/cart?ebookId=${ebookId}`,
                {}, // 🔥 No body needed
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return response.data; 
        } catch (error) {
            console.error("❌ API Error:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || "Failed to add item to cart.");
        }
    }
);


export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (cartId, { rejectWithValue }) => {
    try {
        const token = getLocalStorage("userdata")?.jwtToken;
        if (!token) return rejectWithValue("No token found");

        const res = await axios.delete(`https://server.ztfbooks.com/client/v1/cart?cartId=${cartId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return cartId; // Return the deleted item ID to remove it from Redux state
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        count: 0,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ✅ Fetch Cart Items
            .addCase(fetchCartItems.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.products = action.payload;
                state.count = action.payload.length;
                state.loading = false;
            })
            .addCase(fetchCartItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // ✅ Add to Cart
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                const newItems = Array.isArray(action.payload) ? action.payload.flat() : [action.payload];
                newItems.forEach(item => {
                    if (!state.products.some(p => p.id === item.id)) {
                        state.products.push(item);
                    }
                });

                state.count = state.products.length;
                state.loading = false;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.products = state.products.filter((item) => item.id !== action.payload);
                state.count = state.products.length;

                if (state.products.length === 0) {
                    state.products = []; 
                }

                state.loading = false;
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});


export default cartSlice.reducer;
