import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {
        paymentMethod: '',
        integratorPublicId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        currencyCode: "USD",
        totalAmount: 0,
        cartIds: [],
        metadata: {
            additionalProp1: "",
            additionalProp2: "",
            additionalProp3: ""
        }
    },
    status: false
};

const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        doACheckout: (state, action) => {
            console.log("In slice check", { state, action });
            state.data = {
                ...state.data,
                totalAmount: action.payload.totalAmount,
                cartIds: action.payload.cartIds,
                paymentMethod: action.payload.method,
            };
        }
    }
});

export const { doACheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
