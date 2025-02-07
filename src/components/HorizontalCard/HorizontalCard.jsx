import React from "react";
import { IoMdHeadset } from "react-icons/io";
import { MdOutlineAccessTime } from "react-icons/md";
import { FaHeart } from "react-icons/fa";


const HorizontalCard = (
  { books }
) => {
  return (
    books?.map((book, i) => (
      <div
        key={i}
        className="bg-[#EBEBEB] shadow-lg rounded-lg p-4 w-full max-w-[381px] mb-10 text-black"
      >
        {/* Book Image & Favorite Icon */}
        <div className="relative flex">
          <div className="w-[240px] h-[260px] mx-auto">
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="px-5">

            {/* Book Details */}
            <div className="">
                <h3 className="text-lg font-semibold">{book.title}</h3>

              {/* Author */}
              <p className="text-gray-600 text-sm">Author: {book.author}</p>

              {/* Time & Category */}
              <div className="flex flex-wrap items-center gap-2 text-black text-sm mt-2 font-[300]">
                <span className="flex items-center gap-2">
                  <MdOutlineAccessTime /> {book.duration}
                </span>
                <span className="flex items-center gap-2">
                  <IoMdHeadset /> {book.category}
                </span>
              </div>
            </div>
            <button className="mt-2 rounded-full cursor-pointer flex gap-2 items-center text-[14px]">
              <FaHeart className=" hover:text-[#01447E] text-lg" /> Add to Favourite
            </button>
          </div>
        </div>
      </div>
    ))
  );
};

export default React.memo(HorizontalCard) 