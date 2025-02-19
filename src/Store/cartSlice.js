import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "../LocalStorage/LocalStorage";
import axios from "axios";

const initialState = {
    products: getLocalStorage('carts') || [],
   
    totalPrice: 0,
    loading: false,
    error: null
};


// // ✅ Async function to add item to cart using Axios
// export const addToCartAsync = createAsyncThunk(
//     "cart/addToCartAsync",
//     async (payload, { rejectWithValue }) => {
//         console.log({payload})
//         try {
//             // ✅ Validate token
//             if (!payload.token) return rejectWithValue("Authentication token is missing.");
//             if (!payload.ebookId) return rejectWithValue("Invalid book ID.");
//             if (isTokenExpired(payload.token)) return rejectWithValue("Session expired. Please log in again.");

//             console.log("Sending request with ebookId:", payload.ebookId);

//             // ✅ API request using Axios
//             const response = await axios.post(
//                 `https://server.ztfbooks.com/client/v1/cart?ebookId=${payload.ebookId}`,
//                 {}, // Empty body since we are sending ebookId in URL
//                 {
//                     headers: {
//                         Authorization: `Bearer ${payload.token}`,
//                     },
//                 }
//             );

//             console.log("Axios response:", response);

//             return response.data; 
//         } catch (error) {
//             console.error("Error response:", error);

//             return rejectWithValue(
//                 error.response?.data?.message || "Failed to add to cart"
//             );
//         }
//     }
// );


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        addToCart: (state, action) => {
            const { ebookId, quantity, name, price } = action.payload; // Make sure ebookId is used consistently
        
            const indexedProductID = state.products.findIndex(pro => pro.id === ebookId);
        
            if (indexedProductID >= 0) {
                // If product exists, update quantity
                return {status:'error', message:'item is already in the card'}
            } else {
                // Otherwise, add a new product
                state.products.push({ id: ebookId, quantity, name, price });
            }
        
            // ✅ Save the updated cart array, not just quantity
            setLocalStorage('carts', [...state.products]);
        
            // ✅ Update total price correctly
            state.totalPrice = state.products.reduce((sum, product) =>
                sum + product.quantity * product.price, 0
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