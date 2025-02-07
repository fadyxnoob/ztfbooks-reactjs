import React from 'react';
import { useForm } from 'react-hook-form';
import { CiSearch } from 'react-icons/ci';
import { CiHeart } from "react-icons/ci";
import { BsCart3 } from "react-icons/bs";
import { Link } from 'react-router-dom';
import Input from '../../Input/Input';
import Button from '../../Button/Button';

const Topbar = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Check if form data is being captured properly
  };

  return (
    <div className="bg-[#f6f7f8] flex items-center justify-between px-5 md:px-[80px] py-4 border-b border-[#ded5d5]">
      <h1 className="text-3xl md:text-[36px] font-bold text-[#0B457F]">
        <Link to='/'>ZTF Books</Link>
      </h1>

      {/* Search Bar */}
      <form onSubmit={handleSubmit(onSubmit)} className="hidden md:flex relative w-1/2">
        <Input
          name="search"
          placeholder="Search by book name, Author"
          classes="bg-white w-full border-none outline-none rounded-full h-[55px] text-[#333333] text-center font-medium"
          inputRegister={register("search")} // Pass register function for "search"
        >
          <button type="submit" title="search" className="cursor-pointer">
            <CiSearch className="text-gray-500 text-4xl cursor-pointer" />
          </button>
        </Input>
      </form>

      <div className="flex items-center justify-between w-fit gap-10">
        <Link to='my-favourite' ><CiHeart className="text-gray-600 text-3xl cursor-pointer hidden md:block" /></Link>
        <Link to='my-cart' ><BsCart3 className="text-gray-600 text-3xl cursor-pointer hidden md:block" /></Link>
        <Link to='/login' ><Button classNames="bg-[#0B457F] text-white px-4 py-2 rounded-md cursor-pointer">Login</Button></Link>
        
      </div>
    </div>
  );
};

export default React.memo(Topbar);
