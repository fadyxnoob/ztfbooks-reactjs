import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "../LocalStorage/LocalStorage";

const initialState = {
    products: getLocalStorage('carts') || [],
    totalPrice: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        addToCart: (state, action) => {
            const { id, quantity, name, price } = action.payload
            const indexedProductID = (state.products).findIndex(pro => pro.id === id)
            if (indexedProductID >= 0) {
                state.products[indexedProductID].quantity += quantity
            } else {
                state.products.push({ id, quantity, name, price })
            }
            setLocalStorage('carts', state.products)
            state.totalPrice = state.products.reduce((sum, product) => sum + product.quantity * product.price, 0);
        },

        changeQuantity: (state, action) => {
            const { id, quantity } = action.payload
            const indexedProductID = (state.products).findIndex(pro => pro.id === id)
            if (quantity > 0) {
                state.products[indexedProductID].quantity = quantity
            } else {
                // delete state.products[indexedProductID]
                state.products = (state.products).filter(pro => pro.id !== id)
            }
            setLocalStorage('carts', state.products)
        },

        removeItem: (state, action) => {
            const id = action.payload
            const indexedProductID = (state.products).findIndex(pro => pro.id === id)
            if (indexedProductID >= 0) {
                state.products = (state.products).filter(pro => pro.id !== id)
                setLocalStorage('carts', state.products)
            }
        },

    }
})

export const { addToCart, changeQuantity, removeItem } = cartSlice.actions
export default cartSlice.reducer