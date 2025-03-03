import React, { useEffect, useState } from "react";
import { IoBookSharp } from "react-icons/io5";
import { MdOutlineAccessTime } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import StaticImage from "../../assets/images/BookCoverImage.png";
import service from "../../API/DBService";
import { Link } from "react-router-dom";
import useFavorite from "../../Hooks/useFavorite";

const HorizontalCard = ({ books }) => {
  const [images, setImages] = useState({});
  const { handleAddToFavorite, handleRemoveFromFavorite, isFavorite } = useFavorite()

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


  return books.map((book, i) => {
    const imageUrl = images[book.id] || StaticImage;
    return (
      <div
        key={i}
        className="bg-[#EBEBEB] shadow-lg rounded-lg p-1 w-full mb-10 text-black "
      >
        <div className="relative flex flex-col md:flex-row gap-2 w-full">
          <div className="md:w-1/2 h-[260px] mx-auto">
            <Link to={`book-detail/${book.id}`}>
              <img
                src={imageUrl}
                alt={book.title}
                className="w-full h-full object-fill rounded-md"
              />
            </Link>
          </div>
          <div className="p-2 md:p-0 md:w-1/2">
            <Link to={`book-detail/${book.id}`}>
              <h3 className="text-lg font-semibold">{book.title.split(' ').slice(0, 2).join(' ')}</h3>
            </Link>
            <p className="text-blue-600 underline text-sm">
              <Link
              to={`/author/${book?.detailedInfo?.author?.id}`}
              >
                Author: {book?.author}
              </Link>
            </p>
            <div className="flex flex-wrap items-center gap-2 text-black text-sm mt-2 font-[300]">
              <span className="flex items-center gap-2">
                <MdOutlineAccessTime /> {book.duration}
              </span>
              <span className="flex items-center gap-2">
                <IoBookSharp /> {book.detailedInfo?.categories?.[0].name}
              </span>
            </div>
            <button
              className="mt-2 rounded-full cursor-pointer flex gap-1 items-center text-[14px] text-start"
              onClick={() => isFavorite(book.id) ? handleRemoveFromFavorite(book.id) : handleAddToFavorite(book.id, true)}
            >

              <FaHeart className={`text-lg ${isFavorite(book.id) ? "text-red-500" : "text-gray-400 "}`} />
              {isFavorite(book.id) ? "Remove from Favourite" : "Add to Favourite"}
            </button>
          </div>
        </div>
      </div>
    );
  });
};

export default React.memo(HorizontalCard);
