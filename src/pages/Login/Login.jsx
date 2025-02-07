import React from 'react'
import image from '../../assets/images/login.png'
const Login = () => {
  return (
    <div className='bg-[#F6F7F8F9] px-[80px] flex items-start'>
      <div className='w-[40%] h-[1024px]'>
        <img src={image} alt="" className='size-full object-cover' />
      </div>
      <div className='bg-white px-[130px] py-[150px]'>
        <h1
          className='text-[#01447E] text-3xl font-extralight'
        >WELLCOME TO
          <br />
          <span className='font-semibold text-5xl'>ZTF Books</span>
        </h1>
      </div>
    </div>
  )
}

export default Login
