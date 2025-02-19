import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../Store/favoriteSlice"; 

const useFavorite = () => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.fav.favorites);

    // ✅ Add to Favorites
    const handleAddToFavorite = (id, horizontal) => {
        dispatch(addToFavorites({ id, horizontal }));
    };

    // ✅ Remove from Favorites
    const handleRemoveFromFavorite = (id) => {
        dispatch(removeFromFavorites({ id }));
    };

    // ✅ Check if a book is in Favorites
    const isFavorite = (id) => favorites.some((book) => book.id === id);

    return { handleAddToFavorite, handleRemoveFromFavorite, isFavorite };
};

export default useFavorite;
