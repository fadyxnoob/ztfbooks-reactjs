import React, { useEffect, useState } from "react";
import Image from "../../assets/images/author.png";
import { Link } from "react-router-dom";
import authService from "../../API/authService";
import service from "../../API/DBService";


const UserLogin = () => {
  const [user, setUser] = useState({
    image: "",
    name: "",
  });

  const getCurrentLoggedIN = async () => {
    try {
      const res = await authService.getCurrentLoggedIn();
      const imageRes = await service.getFileByName(res.image); // Make sure to await this

      setUser({
        image: imageRes,
        name: res?.user?.name,
      });

    } catch (error) {
      console.error("Error fetching current user or image:", error);
    }
  };

  useEffect(() => {
    getCurrentLoggedIN();
  }, []);
  return (
    <div>
      <Link to={`/myProfile`} className="flex items-center gap-2">
        <img
          src={user?.image || Image}
          alt=""
          className="size-[50px] object-cover"
        />
        <p className="text-base font-medium text-[#333333] hidden md:block">
          {user?.name?.split(" ")[0]} <br /> {user?.name?.split(" ")[1]}
        </p>
      </Link>
    </div>
  );
};

export default React.memo(UserLogin);
