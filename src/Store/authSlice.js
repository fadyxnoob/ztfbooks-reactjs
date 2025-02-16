import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage } from "../LocalStorage/LocalStorage";


const initialState = {
    status: getLocalStorage('authUserStatus') || false,
    userdata: getLocalStorage('userData') || null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            if (!action.payload) {
                console.error("Invalid payload detected");
                return;
            }

            state.status = true;
            state.userdata = action.payload.userdata; 
        },

        logout: (state) => {
            state.status = false;
            state.userdata = null;
        },
    },
});

export const { login: authLogin, logout } = authSlice.actions;
export default authSlice.reducer;