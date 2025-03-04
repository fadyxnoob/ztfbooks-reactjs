import React, { useEffect, useState } from "react";
import BookCard from "../../components/BookCard/BookCard";
import BookCoverImage from "../../assets/images/BookCoverImage.png";
import HorizontalCard from "../../components/HorizontalCard/HorizontalCard";
import { useSelector } from "react-redux";
import service from "../../API/DBService";
import { getLocalStorage } from "../../LocalStorage/LocalStorage";
import Loader from "../../components/Loader/Loader";
const MyFavourite = () => {
  const storeBooks = useSelector(
    (state) => state.fav.favorites || getLocalStorage("fav")
  );
  const [favBooks, setFavBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch books
  const getFavoriteBooks = async () => {
    if (!storeBooks?.length) return;
    try {
      const formattedBooks = await Promise.all(
        storeBooks
          .filter((bookItem) => bookItem?.id)
          .map(async (bookItem) => {
            try {
              const singleBook = await service.getBookByID(bookItem.id);

              if (!singleBook?.data) {
                console.warn(`No data for book ID: ${bookItem.id}`); // ✅ Warn if API fails
                return null;
              }

              return {
                title: singleBook.data.ebookTitle,
                id: singleBook.data.id,
                horizontal: bookItem.horizontal,
                thumbnailFileName: singleBook.data.thumbnailFileName,
                author: singleBook.data.author?.name || "Unknown Author",
                duration: singleBook.data.timeToRead || "N/A",
                category: singleBook.data.categories?.[0]?.name || "N/A",
                detailedInfo: singleBook.data,
              };
            } catch (error) {
              console.error(
                `Failed to fetch book details for ID: ${bookItem.id}`,
                error
              );
              return null;
            }
          })
      );
      setFavBooks(formattedBooks.filter(Boolean));
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch favorite books:", error);
    }
  };

  useEffect(() => {
    getFavoriteBooks();
  }, [storeBooks]);

  // Split books into horizontal & normal categories
  const horizontalBooks = favBooks.filter((book) => book.horizontal);
  const normalBooks = favBooks.filter((book) => !book.horizontal);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="px-5 md:px-20">
      <section className="my-10">
        <h4 className="text-[#203949] text-3xl text-center md:text-start font-medium">
          Favorites – Your Wishlist: Saved Books & Favorites
        </h4>
        <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          <BookCard books={normalBooks} fav={true} />
        </div>
      </section>

      <section className=" bg-white p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 ">
          <HorizontalCard books={horizontalBooks} fav={true} />
        </div>
      </section>
    </div>
  );
};

export default React.memo(MyFavourite);
