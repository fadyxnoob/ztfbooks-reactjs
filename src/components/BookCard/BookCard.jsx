import React, { useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { IoMdHeadset } from "react-icons/io";
import { MdOutlineAccessTime } from "react-icons/md";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import RandomFileThumbnail from '../../assets/images/BookCoverImage.png'
import service from "../../API/DBService";

const BookCard = ({ books }) => {
  const dispatch = useDispatch();

  // Function to add book to the cart
  const handleAddToCart = (book) => {
    dispatch({ type: 'ADD_TO_CART', payload: book.id });
    console.log(`${book.id} added to cart!`);
  };

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
                src={service.getFileByName(book.thumbnailFileName) || RandomFileThumbnail}
                alt={book.ebookTitle || 'Book cover'}
                className="w-full h-full object-cover rounded-md"
                onError={(e) => e.target.src = RandomFileThumbnail} // Fallback if the image fails to load
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
                {book.ebookTitle}
              </Link>
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 text-yellow-500 bg-[#1D2C41] px-3 py-1 rounded-2xl">
              <FaStar />
              <span className="text-sm font-medium text-white">{book?.rating}</span>
            </div>
          </div>

          {/* Author */}
          <p className="text-gray-700 text-sm">
            Author: {book?.author?.name || 'Unknown'}
          </p>

          {/* Time & Category */}
          <div className="flex flex-wrap items-center gap-4 text-black text-sm mt-2 font-light">
            <span className="flex items-center gap-2">
              <MdOutlineAccessTime className="text-blue-500" /> {book.timeToRead ? `${book.timeToRead} mins` : 'N/A'}
            </span>
            <span className="flex items-center gap-2">
              <IoMdHeadset className="text-green-600" /> {book?.categories?.[0]?.name || 'Uncategorized'}
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
