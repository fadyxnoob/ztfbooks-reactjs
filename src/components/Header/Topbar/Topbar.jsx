import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CiSearch, CiHeart } from "react-icons/ci";
import { BsCart3 } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import UserLogin from "../../UserLogin/UserLogin";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import service from "../../../API/DBService";
import { fetchCartItems } from "../../../Store/cartSlice";

const Topbar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [logo, setLogo] = useState("");
  const { register } = useForm();

  // const dispatch = useDispatch()
  const isLogin = useSelector((state) => state.auth.status);
  const products = useSelector((state) => state.cart.products); 
  const quantity = products.length;

  // useEffect(() => {
  //   dispatch(fetchCartItems());
  // }, [dispatch]);



  // Debounced search function
  const debouncedSearch = debounce((value) => {
    setQuery(value);
    navigate(
      value.trim() ? `/search?q=${encodeURIComponent(value)}` : "/search"
    );
}, 0);

  const handleSearch = (value) => {
    debouncedSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const authStatus = localStorage.getItem("authUserStatus");

  const getSiteLogo = async () => {
    const logoURL = await service.getLogo();
    setLogo(logoURL);
  };

  useEffect(() => {
    getSiteLogo();
  }, []);

  return (
    <div className="bg-[#f6f7f8] flex items-center justify-between px-5 md:px-[80px] py-4 border-b border-[#ded5d5]">
      <h1 className="text-3xl md:text-[36px] font-bold text-[#0B457F]">
        <Link to="/">
          {logo ? (
            <img src={logo} alt="Site Logo" className="h-[44px] w-[190px]" />
          ) : (
            " ZTF Books"
          )}
        </Link>
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

      {/* Icons & Login */}
      <div className="flex items-center justify-between w-fit gap-10">
        <Link to="my-favourite">
          <CiHeart className="text-gray-600 text-3xl cursor-pointer hidden md:block" />
        </Link>
        <Link to="my-cart">
          <div className="relative hidden md:block">
            <BsCart3 className="text-gray-600 text-3xl cursor-pointer" />
            {authStatus && quantity > 0 && (
              <div className="size-[23px] bg-[#BE5C5C] text-white text-sm font-normal text-center align-middle rounded-full absolute top-0 -right-2">
                {quantity}
              </div>
            )}
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
