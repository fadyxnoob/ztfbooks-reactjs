import React, { useEffect, useState } from "react";
import { IoMdHeadset } from "react-icons/io";
import { MdOutlineAccessTime } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import StaticImage from '../../assets/images/BookCoverImage.png';
import service from "../../API/DBService";
import { Link } from "react-router-dom";

const HorizontalCard = ({ books, toggleFavorite, favorites }) => {
  const [images, setImages] = useState({});

  useEffect(() => {
    const fetchImages = async () => {
      const imageMap = {};

      for (const book of books) {
        if (book?.image) {
          try {
            const url = await service.getFileByName(book.image);
              imageMap[book.id] = url;
          } catch (error) {
            console.error(`Failed to fetch image for ${book.title}:`, error);
            imageMap[book.id] = StaticImage;
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
    books.map((book, i) => {
      const isFavorite = favorites.some((fav) => fav.id === book.id);
      const imageUrl = images[book.id] || StaticImage;
      return (
        <div
          key={i}
          className="bg-[#EBEBEB] shadow-lg rounded-lg p-4 w-full max-w-[381px] mb-10 text-black"
        >
          <div className="relative flex">
            <div className="w-1/2 h-[260px] mx-auto">
            <Link
             to={`book-detail/${book.id}`}
             >
              <img
                src={imageUrl}
                alt={book.title}
                className="w-full h-full object-cover rounded-md"
              />
             </Link>
              
            </div>
            <div className="px-5 w-1/2">
             <Link
             to={`book-detail/${book.id}`}
             >
               <h3 className="text-lg font-semibold">{book.title}</h3>
             </Link>
              <p className="text-gray-600 text-sm">Author: {book?.detailedInfo.author.name}</p>
              <div className="flex flex-wrap items-center gap-2 text-black text-sm mt-2 font-[300]">
                <span className="flex items-center gap-2">
                  <MdOutlineAccessTime /> {book.duration}
                </span>
                <span className="flex items-center gap-2">
                  <IoMdHeadset /> {book.detailedInfo?.categories?.[0].name}
                </span>
              </div>
              <button
                className="mt-2 rounded-full cursor-pointer flex gap-2 items-center text-[14px]"
                onClick={() => toggleFavorite(book)}
              >
                <FaHeart
                  className={`text-lg ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
                />
                {isFavorite ? 'Remove from Favourite' : 'Add to Favourite'}
              </button>
            </div>
          </div>
        </div>
      );
    })
  );
};

export default React.memo(HorizontalCard);
