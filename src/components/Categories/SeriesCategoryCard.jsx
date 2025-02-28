import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DefaultImage from "../../assets/images/series-img.png"; // Fallback image
import service from "../../API/DBService";

const SeriesCategoryCard = ({ book, seriesName}) => {
  const [bookImage, setBookImage] = useState('')
  const getImage = async () => {
    const url = await service.getFileByName(book.thumbnailFileName)
    setBookImage(url)
  }
  useEffect(() => {
    getImage()
  }, [])
  return (
    <div
    key={book.id}
    className="max-h-[350px] max-w-[220px] rounded-lg shadow-md hover:shadow-lg transition">
      <Link to={`/series/${seriesName}/book/${book.id}`}>
        <img
          src={bookImage || DefaultImage} // Use bookImage if available, else fallback
          alt={seriesName}
          className="size-full object-fill rounded-lg"
        />
      </Link>
    </div>
  );
};

export default React.memo(SeriesCategoryCard);
