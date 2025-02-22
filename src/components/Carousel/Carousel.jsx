import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import BookCard from "../BookCard/BookCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Carousel = ({ books, pathTo = "/e-books" }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef(null);

  const handleSlideChange = () => {
    if (swiperRef.current) {
      setIsBeginning(swiperRef.current.swiper.isBeginning);
      setIsEnd(swiperRef.current.swiper.isEnd);
    }
  };

  return (
    <div className="relative w-full">
        {/* Show "View All Books" Link Only on Last Slide */}
        {isEnd && (
          <div className="text-center mt-5 absolute top-0 right-5 z-20">
            <Link
              to={pathTo}
              onClick={() => console.log(`You clicked on ${pathTo}`)}
              className="text-blue-600 font-semibold hover:underline"
            >
              View All Books →
            </Link>
          </div>
        )}
      {/* Custom Left Arrow (Hidden on First Slide) */}
      {!isBeginning && (
        <button
          className="cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-700 transition"
          onClick={() => swiperRef.current.swiper.slidePrev()}
        >
          <FaChevronLeft size={20} />
        </button>
      )}

      <Swiper
        ref={swiperRef}
        modules={[Navigation]}
        slidesPerView={5}
        spaceBetween={20}
        loop={false}
        onSlideChange={handleSlideChange}
        className="mySwiper"
        breakpoints={{
          0: {
            slidesPerView: 1, 
          },
          640: {
            slidesPerView: 2, 
          },
          1024: {
            slidesPerView: 4, 
          },
        }}
      >
        {books.map((book, index) => (
          <SwiperSlide key={index} className="mt-10">
            <BookCard books={[book]} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Right Arrow (Hidden on Last Slide) */}
      {!isEnd && (
        <button
          className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-700 transition"
          onClick={() => swiperRef.current.swiper.slideNext()}
        >
          <FaChevronRight size={20} />
        </button>
      )}
    </div>
  );
};

export default React.memo(Carousel);
