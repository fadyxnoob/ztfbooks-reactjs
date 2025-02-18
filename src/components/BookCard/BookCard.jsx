import React, { useEffect, useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { IoMdHeadset } from "react-icons/io";
import { MdOutlineAccessTime } from "react-icons/md";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import StaticImage from '../../assets/images/BookCoverImage.png';
import service from "../../API/DBService";

const BookCard = ({ books }) => {
  const dispatch = useDispatch();
  const [images, setImages] = useState({});

  // Function to add book to the cart
  const handleAddToCart = (book) => {
    dispatch({ type: 'ADD_TO_CART', payload: book.id });
    console.log(`${book.id} added to cart!`);
  };

  // Fetch images for all books
  useEffect(() => {
    const fetchImages = async () => {
      const imageMap = {};

      for (const book of books) {
        if (book.thumbnailFileName) {
          try {
            const response = await service.getFileByName(book.thumbnailFileName);
            if (response) {
              
              imageMap[book.id] = response;
            }
          } catch (error) {
            console.error(`Failed to fetch image for ${book.ebookTitle}:`, error);
          }
        } else {
          imageMap[book.id] = StaticImage;
        }
      }
      setImages(imageMap);
    };

    fetchImages();
  }, [books]);

  return (
    books?.map((book, i) => (
      <div
        key={i}
        className="bg-[#EBEBEB] shadow-lg rounded-xl p-4 w-full max-w-[280px] transition hover:scale-105"
      >
        {/* Book Image & Favorite Icon */}
        <div className="relative">
          <Link to={`/book-detail/${book.id}`}>
            <div className="w-[240px] h-[240px] mx-auto">
              <img
                src={images[book.id] || StaticImage}
                alt={book.ebookTitle}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </Link>
          <button className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md cursor-pointer hover:bg-red-100">
            <FaHeart className={`text-${book.liked ? 'red' : 'gray'}-500`} />
          </button>
        </div>

        {/* Book Details */}
        <div className="mt-3">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold truncate">
              <Link to={`/book-detail/${book.id}`} className="hover:underline">
                {book?.ebookTitle || book?.detailedInfo?.ebookTitle}
              </Link>
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 text-yellow-500 bg-[#1D2C41] px-3 py-1 rounded-2xl">
              <FaStar />
              <span className="text-sm font-medium text-white">{book?.rating || book?.detailedInfo?.rating}</span>
            </div>
          </div>

          {/* Author */}
          <p className="text-gray-700 text-sm">
            Author: {book?.author?.name || book?.detailedInfo?.author?.name}
          </p>

          {/* Time & Category */}
          <div className="flex flex-wrap items-center gap-4 text-black text-sm mt-2 font-light">
            <span className="flex items-center gap-2">
              <MdOutlineAccessTime className="text-blue-500" /> {book.timeToRead ? `${book.timeToRead} mins` : book?.detailedInfo?.timeToRead}
            </span>
            <span className="flex items-center gap-2">
              <IoMdHeadset className="text-green-600" /> {book?.categories?.[0]?.name || book?.detailedInfo?.categories?.[0]?.name}
            </span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-4">
          <Button
            classNames="bg-[#01447E] text-white w-full py-2 cursor-pointer hover:bg-[#013366]"
            onClick={() => handleAddToCart(book)}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    ))
  );
};

export default React.memo(BookCard);
