import React, { useEffect, useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { IoBookSharp } from "react-icons/io5";
import { MdOutlineAccessTime } from "react-icons/md";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import StaticImage from "../../assets/images/BookCoverImage.png";
import service from "../../API/DBService";
import { addToCart } from "../../Store/cartSlice";
import Alert from "../Alert/Alert";
import useFavorite from "../../Hooks/useFavorite";

const BookCard = ({ books }) => {
  const dispatch = useDispatch();
  const { handleAddToFavorite, handleRemoveFromFavorite, isFavorite } =
    useFavorite();

  const [images, setImages] = useState({});
  const [loading, setLoading] = useState({});
  const [alert, setAlert] = useState(null);

  // Function to show alert
  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 2000); // Hide after 2 seconds
  };

  const handleAddToCart = async (ebookId) => {
    if (!ebookId) {
      console.error("Invalid cart item:", { ebookId });
      return showAlert("error", "Invalid book details!");
    }

    try {
      setLoading((prev) => ({ ...prev, [ebookId]: true }));

      const result = await dispatch(addToCart({ ebookId }));
      if (addToCart.fulfilled.match(result)) {
        showAlert("success", "Item added to the cart successfully!");
      } else {
        showAlert("error", result.payload || "Failed to add item to cart.");
      }
    } catch (error) {
      console.error("❌ Error adding to cart:", error);
      showAlert("error", "Something went wrong! Try again.");
    } finally {
      setLoading((prev) => ({ ...prev, [ebookId]: false }));
    }
  };

  // Fetch images for all books
  useEffect(() => {
    const fetchImages = async () => {
      const imageMap = {};
      for (const book of books) {
        if (book.thumbnailFileName) {
          try {
            const response = await service.getFileByName(
              book.thumbnailFileName
            );

            imageMap[book.id] = response;
          } catch (error) {
            console.error(
              `Failed to fetch image for ${book.ebookTitle}:`,
              error
            );
            imageMap[book.id] = StaticImage;
          }
        } else {
          imageMap[book.id] = StaticImage;
        }
      }
      setImages(imageMap);
    };

    fetchImages();

    // Cleanup function
    return () => {
      // Revoke all created URLs
      Object.values(images).forEach((url) => {
        if (url !== StaticImage) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [books]);

  return (
    <>
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      {/* Show Alert */}
      {books?.map((book, i) => (
        <div
          key={i}
          className="bg-[#EBEBEB] shadow-lg rounded-xl p-4 w-full mx-auto mb-5 mt-5 transition hover:scale-105"
        >
          {/* Book Image & Favorite Icon */}
          <div className="relative">
            <Link to={`/book-detail/${book.id}`}>
              <div className="w-[240px] h-[240px] mx-auto">
                <img
                  src={images[book.id] || StaticImage}
                  alt={book.ebookTitle}
                  className="w-full h-full object-fill rounded-md"
                />
              </div>
            </Link>
            <button
              onClick={() =>
                isFavorite(book.id)
                  ? handleRemoveFromFavorite(book.id)
                  : handleAddToFavorite(book.id, false)
              }
              className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md cursor-pointer hover:bg-red-100"
            >
              <FaHeart
                className={`text-${isFavorite(book.id) ? "red" : "gray"}-500`}
              />
            </button>
          </div>

          {/* Book Details */}
          <div className="mt-3">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold truncate">
                <Link
                  to={`/book-detail/${book.id}`}
                  className="hover:underline"
                >
                  {book.ebookTitle || book?.detailedInfo?.ebookTitle}
                </Link>
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-1 text-yellow-500 bg-[#1D2C41] px-3 py-1 rounded-2xl">
                <FaStar />
                <span className="text-sm font-medium text-white">
                  {book?.rating || book?.detailedInfo?.rating || null}
                </span>
              </div>
            </div>

            {/* Author */}
            <p className="text-gray-700 text-sm">
              Author:{" "}
              {book?.author?.name ||
                book?.detailedInfo?.author?.name ||
                null}
            </p>

            {/* Time & Category */}
            <div className="flex flex-wrap items-center gap-4 text-black text-sm mt-2 font-light">
              <span className="flex items-center gap-2">
                <MdOutlineAccessTime className="text-blue-500" />
                {book.timeToRead || book?.detailedInfo?.timeToRead
                  ? `${book.timeToRead || book?.detailedInfo?.timeToRead} mins`
                  : null}
              </span>
              <span className="flex items-center gap-2">
                <IoBookSharp className="text-green-600" />
                {book?.categories?.[0]?.name.split(" ").slice(0, 2).join(" ") ||
                  book?.detailedInfo?.categories?.[0]?.name ||
                  null}
              </span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="mt-4">
            <Button
              classNames={`w-full py-2 cursor-pointer ${
                loading[book.id]
                  ? "bg-gray-400"
                  : "bg-[#01447E] hover:bg-[#013366]"
              } text-white`}
              onClick={() =>
                handleAddToCart(book.id, 1, book.ebookTitle, book.amount)
              }
              disabled={loading[book.id]}
            >
              {loading[book.id] ? "Adding..." : "Add to Cart"}
            </Button>
          </div>
        </div>
      ))}
    </>
  );
};

export default React.memo(BookCard);
