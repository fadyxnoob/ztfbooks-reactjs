import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiBars4 } from "react-icons/hi2";
import Input from "../../Input/Input";
import { useForm } from "react-hook-form";
import { CiSearch, CiHeart } from "react-icons/ci";
import { BsCart3 } from "react-icons/bs";
import { debounce } from "lodash";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  const handleMenu = () => {
    setOpenMenu((p) => !p);
  };
  const { register } = useForm();
  // Debounced search function
  const debouncedSearch = debounce((value) => {
    setQuery(value);
    navigate(
      value.trim() ? `/search?q=${encodeURIComponent(value)}` : "/search"
    );
  }, 500);

  const handleSearch = (value) => {
    debouncedSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const cart = useSelector((state) => state.cart.products);
  const totalQuantity = cart.length


  const authStatus = localStorage.getItem("authUserStatus");
  return (
    <nav className="drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] bg-[#f6f7f8] md:pt-2 h-full md:h-12 px-5 md:pl-16 flex justify-between items-start relative">
      <ul className="list-none hidden md:flex items-center gap-10 w-1/2 md:mx-auto overflow-hidden">
        <li>
          <Link to={"/e-books"} className="font-medium text-[#333333]">
            {" "}
            eBooks
          </Link>
        </li>
        <li>
          <Link to={"/audio-books"} className="font-medium text-[#333333]">
            AudioBooks
          </Link>
        </li>
        <li>
          <Link to={"/faqs"} className="font-medium text-[#333333]">
            Faq's
          </Link>
        </li>
        <li>
          <Link to={"/about-us"} className="font-medium text-[#333333]">
            About us
          </Link>
        </li>
      </ul>

      {/* responsive menu */}
      <ul
        className={`${
          openMenu ? "flex" : "hidden"
        } list-none md:hidden flex-col items-start gap-5 text-left  md:mx-auto overflow-hidden py-2 w-full`}
      >
        <li>
          <Link
            onClick={()=> setOpenMenu(false)}
          to={"/e-books"} className="font-medium text-[#333333]">
            {" "}
            eBooks
          </Link>
        </li>
        <li>
          <Link
            onClick={()=> setOpenMenu(false)}
          to={"/audio-books"} className="font-medium text-[#333333]">
            AudioBooks
          </Link>
        </li>
        <li>
          <Link
            onClick={()=> setOpenMenu(false)}
          to={"/faqs"} className="font-medium text-[#333333]">
            Faq's
          </Link>
        </li>
        <li>
          <Link
            onClick={()=> setOpenMenu(false)}
          to={"/about-us"} className="font-medium text-[#333333]">
            About us
          </Link>
        </li>
        <li>
          <div className="flex items-center justify-between w-fit gap-10">
            <Link
              onClick={()=> setOpenMenu(false)}
            to="my-favourite">
              <CiHeart className="text-gray-600 text-3xl cursor-pointer" />
            </Link>
            <Link
              onClick={()=> setOpenMenu(false)}
            to="my-cart">
              <div className="relative">
                <BsCart3 className="text-gray-600 text-3xl cursor-pointer" />
                {authStatus && totalQuantity > 0 && (
                  <div className="size-[23px] bg-[#BE5C5C] text-white text-sm font-normal text-center align-middle rounded-full absolute top-0 -right-2">
                    {totalQuantity}
                  </div>
                )}
              </div>
            </Link>
          </div>
        </li>
        <li className="w-full">
          {/* Search Bar */}
          <form className="flex relative w-full" onSubmit={handleSubmit}>
            <Input
              name="search"
              placeholder="Search by book name, Author"
              classes="bg-white w-full border-none outline-none rounded-full text-sm h-[55px] text-[#333333] text-left font-normal px-5"
              inputRegister={register("search")}
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
            >
              <button type="submit" title="search" className="cursor-pointer">
                <CiSearch className="text-gray-500 text-4xl cursor-pointer" />
              </button>
            </Input>
          </form>
        </li>
        <li className="w-full">
          <div className="flex items-center justify-end gap-5 w-full">
            <Link to="my-favourite">
              <CiHeart className="text-gray-600 text-3xl cursor-pointer hidden md:block" />
            </Link>
            <Link to="my-cart">
              <BsCart3 className="text-gray-600 text-3xl cursor-pointer hidden md:block" />
            </Link>
          </div>
        </li>
      </ul>
      <div
        className={`cursor-pointer relative  md:hidden ${
          !openMenu
            ? "bg-[#f6f7f8] w-full right-0 flex justify-end top-0"
            : "right-0 top-0"
        }`}
        onClick={handleMenu}
      >
        <HiBars4 className="text-[#333333] text-3xl" />
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
