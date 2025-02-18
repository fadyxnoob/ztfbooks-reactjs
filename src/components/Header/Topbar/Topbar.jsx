import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { BsCart3 } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import UserLogin from "../../UserLogin/UserLogin";
import { useSelector } from "react-redux";
import { getLocalStorage } from "../../../LocalStorage/LocalStorage";
import { debounce } from "lodash";

const Topbar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { register } = useForm();
  const [isLogin, setIsLogin] = useState(
    useSelector((state) => state.auth.status) ||
      getLocalStorage("authUserStatus")
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    } else {
      navigate("/search");
    }
  };

  const debouncedSearch = debounce((value) => {
    setQuery(value);
    if (value.trim()) {
      navigate(`/search?q=${encodeURIComponent(value)}`);
    } else {
      navigate("/search");
    }
  }, 500);

  const handleSearch = (value) => {
    debouncedSearch(value);
  };

  return (
    <div className="bg-[#f6f7f8] flex items-center justify-between px-5 md:px-[80px] py-4 border-b border-[#ded5d5]">
      <h1 className="text-3xl md:text-[36px] font-bold text-[#0B457F]">
        <Link to="/">ZTF Books</Link>
      </h1>

      {/* Search Bar */}
      <form className="hidden md:flex relative w-1/2" onSubmit={handleSubmit}>
        <Input
          name="search"
          placeholder="Search by book name, Author"
          classes="bg-white w-full border-none outline-none rounded-full h-[55px] text-[#333333] text-center font-medium"
          inputRegister={register("search")}
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        >
          <button type="submit" title="search" className="cursor-pointer">
            <CiSearch className="text-gray-500 text-4xl cursor-pointer" />
          </button>
        </Input>
      </form>

      <div className="flex items-center justify-between w-fit gap-10">
        <Link to="my-favourite">
          <CiHeart className="text-gray-600 text-3xl cursor-pointer hidden md:block" />
        </Link>
        <Link to="my-cart">
          <div className="relative hidden md:block">
            <BsCart3 className="text-gray-600 text-3xl cursor-pointer" />
            <div className="size-[23px] bg-[#BE5C5C] text-white text-sm font-normal text-center align-middle rounded-full absolute top-0 -right-2">
              1
            </div>
          </div>
        </Link>
        {isLogin ? (
          <UserLogin />
        ) : (
          <Link to="/login">
            <Button classNames="bg-[#0B457F] text-white px-4 py-2 rounded-md cursor-pointer">
              Login
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default React.memo(Topbar);
