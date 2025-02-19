import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "../LocalStorage/LocalStorage";

const initialState = {
    favorites: getLocalStorage("fav") || [], 
};

const favSlice = createSlice({
    name: "fav",
    initialState,
    reducers: {
        // ✅ Add to Favorites
        addToFavorites: (state, action) => {
            const { id, horizontal } = action.payload;
            const exists = state.favorites.some((book) => book.id === id);

            if (!exists) {
                state.favorites.push({ id, horizontal });
                setLocalStorage("fav", state.favorites);
            }
        },

        // ✅ Remove from Favorites
        removeFromFavorites: (state, action) => {
            const { id } = action.payload;
            state.favorites = state.favorites.filter((book) => book.id !== id);
            setLocalStorage("fav", state.favorites);
        },
    },
});

export const { addToFavorites, removeFromFavorites } = favSlice.actions;
export default favSlice.reducer;
