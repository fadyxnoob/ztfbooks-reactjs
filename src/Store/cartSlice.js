import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getLocalStorage, setLocalStorage } from "../LocalStorage/LocalStorage";

// ✅ Async Thunk: Add Item to Cart via API
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ ebookId }, { rejectWithValue }) => {
        console.log({ebookId})
        try {
            const token = getLocalStorage("userdata")?.jwtToken;
            if (!token) throw new Error("Authentication error! Please login.");

            // 🔍 Debugging logs
            console.log("🛒 Adding to cart:", ebookId);
            
            // ✅ API Call to Add Item
            const response = await axios.post(
                `https://server.ztfbooks.com/client/v1/cart?ebookId=${ebookId}`,
                null, // 🔥 Some APIs reject empty `{}` but accept `null`
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            console.log("✅ Item added successfully:", response.data);

        } catch (error) {
            console.error("❌ Error adding to cart:", error.response?.data || error.message);

            // Handle API-specific error responses
            return rejectWithValue(error.response?.data?.error || "Failed to add item to cart.");
        }
    }
);










// ✅ Async Thunk: Remove Item from Cart via API
export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async (cartId, { rejectWithValue }) => {
        try {
            const token = getLocalStorage("userdata")?.jwtToken;
            if (!token) throw new Error("Authentication error! Please login.");

            await axios.delete(`https://server.ztfbooks.com/client/v1/cart?cartId=${cartId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

        } catch (error) {
            console.error("❌ Error removing from cart:", error);
            return rejectWithValue(error.response?.data || "Failed to remove item from cart.");
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: getLocalStorage("carts") || [],
        totalPrice: 0,
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.products.push(action.payload);

                // ✅ Update Local Storage after modification
                setLocalStorage("carts", state.products);

                state.totalPrice = state.products.reduce(
                    (sum, product) => sum + product.quantity * product.price,
                    0
                );
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(removeFromCart.pending, (state) => {
                state.status = "loading";
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.products = state.products.filter((item) => item.id !== action.payload);

                // ✅ Update Local Storage after removing item
                setLocalStorage("carts", state.products);

                state.totalPrice = state.products.reduce(
                    (sum, product) => sum + product.quantity * product.price,
                    0
                );
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});


export default cartSlice.reducer;
