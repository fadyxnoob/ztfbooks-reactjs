import React, { useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { IoMdHeadset } from "react-icons/io";
import { MdOutlineAccessTime } from "react-icons/md";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const BookCard = ({ books }) => {
  // const [products, setProducts] = useState([]);
  const [images, setImages] = useState({});
  const dispatch = useDispatch()
  // const userdata = useSelector((state) => state.auth.userdata);
  // const cart = useSelector((state) => state.cart.products)




  return (
    books?.map((book, i) => (
      <div
        key={i}
        className="bg-[#EBEBEB] shadow-lg rounded p-4 w-full max-w-[280px]"
      >
        {/* Book Image & Favorite Icon */}
        <div className="relative">
          <Link to={'/book-detail'}>
            <div className="w-[240px] h-[240px] mx-auto">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </Link>
          <button className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md cursor-pointer">
            <FaHeart className="text-gray-500 hover:text-red-500" />
          </button>
        </div>

        {/* Book Details */}
        <div className="mt-3">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold">
              <Link to='/book-detail' className="hover:underline">
                {book.title}
              </Link>
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 text-yellow-500 bg-[#1D2C41] px-3 py-1 rounded-2xl">
              <FaStar />
              <span className="text-sm font-medium text-white">{book.rating}</span>
            </div>
          </div>

          {/* Author */}
          <p className="text-gray-600 text-sm">Author: {book?.publisher?.name}</p>

          {/* Time & Category */}
          <div className="flex flex-wrap items-center gap-10 text-black text-sm mt-2 font-[300]">
            <span className="flex items-center gap-2">
              <MdOutlineAccessTime /> {book.duration}
            </span>
            <span className="flex items-center gap-2">
              <IoMdHeadset /> {book?.categories?.name}
            </span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-4">
          <Button

            classNames="bg-[#01447E] text-white w-full py-2 cursor-pointer"

          >
            Add to Cart
          </Button>
        </div>
      </div>
    ))
  );
};

export default React.memo(BookCard);
