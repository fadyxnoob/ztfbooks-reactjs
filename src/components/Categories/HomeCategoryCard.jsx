import React, { useEffect, useState } from "react";
import CardImage from '../../assets/images/series-card-home-bg.png';
import Button from '../Button/Button';
import service from "../../API/DBService";

const HomeCategoryCard = ({ item }) => {
  const [catImage, setCatImage] = useState('');

  useEffect(() => {
    const getImageUrl = async () => {
      const url = await service.getFileByName(item?.thumbNailName);
      setCatImage(url);
    };
    getImageUrl();
  }, []);

  return (
    <div
      className="ps-6 py-10 rounded-xl relative overflow-hidden h-full max-h-[230px] bg-cover bg-right"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(151, 71, 255, 0.9), rgba(2, 123, 228, 0.9)), 
          url(${catImage || CardImage})
        `, // ✅ Gradient + Image together
        backgroundSize: "contain",
        backgroundPosition: "right center",
      }}
    >
      <div className="z-20">
        <h4 className="text-white text-3xl font-extrabold">
          {item?.name.split(" ").slice(0, 3).join(" ")}
        </h4>
        <p className="mt-3 text-white text-base font-normal">
          {item?.description.split(" ").slice(0, 3).join(" ")}
        </p>
        <div className="mt-10">
          <Button
            classNames="bg-[#253F76] py-3 px-8 text-white text-sm font-medium rounded-2xl cursor-pointer"
            path={`/series/${item.name}`}
          >
            View Series
          </Button>
        </div>
      </div>

      {/* ❌ Removed <img> and used gradient+image background */}
    </div>
  );
};

export default React.memo(HomeCategoryCard);
