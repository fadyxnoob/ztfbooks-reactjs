import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "../LocalStorage/LocalStorage";

const initialState = {
    status: getLocalStorage('authUserStatus') || false,
    userdata: getLocalStorage('userdata')?.jwtToken || null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            console.log({ action })
            if (!action.payload) {
                console.error("Invalid payload detected");
                return;
            }

            state.status = true;
            state.userdata = action.payload.userdata;
            setLocalStorage('userdata', state.userdata)
        },

        logout: (state) => {
            state.status = false;
            state.userdata = null;
        },
    },
});

export const { login: authLogin, logout } = authSlice.actions;
export default authSlice.reducer;