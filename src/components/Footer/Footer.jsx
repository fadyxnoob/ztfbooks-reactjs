import React from 'react'
import androidApp from '../../assets/images/android-app.png'
import iosApp from '../../assets/images/ios-app.png'
import { Link } from 'react-router-dom'
const Footer = () => {
    return (
        <div className='text-white bg-[#01447e] w-full px-5 md:px-[80px]'>
            <div className=' flex flex-col md:flex-row items-start justify-between py-20 gap-5 md:gap-0'>
                <div className=''>
                    <h2 className='text-white font-bold text-[36px] leading-[43px]'>ZTF <br /> Books</h2>
                    <p className='text-white leading-[24px] mt-5'>Lorem ispum or nws letter subscribe <br />
                        us on facebook twitter. Your need is <br />
                        our priority. </p>
                </div>
                <div className=''>
                    <h3 className='leading-[36px] text-[24px] font-medium'>Sitemap</h3>
                    <ul className='mt-2 leading-[23px] font-medium list-none flex flex-col gap-3'>
                        <li><p className='font-medium'>About Us</p></li>
                        <li><p className='font-medium'>What We Do</p></li>
                        <li><p className='font-medium'>Investment</p></li>
                    </ul>
                </div>
                <div className=''>
                    <h3 className='leading-[36px] text-[24px] font-medium'>Get Our Apps</h3>
                    <ul className='mt-10 leading-[23px] font-medium list-none flex gap-3 flex-col md:flex-row'>
                        <li className='h-[80px] w-[240px]'>
                            <a href="#"> <img src={androidApp} alt='Android App' className='size-full object-cover cursor-pointer' /></a>
                        </li>
                        <li className='h-[80px] w-[240px]'>
                            <a href="#"> <img src={iosApp} alt='Ios App' className='size-full object-cover cursor-pointer' /></a>
                        </li>
                    </ul>
                </div>
                <div className=''>
                    <h3 className='leading-[36px] text-[24px] font-medium'>Follow Us</h3>
                    <p className='font-medium'>Social Media</p>
                    <ul className='mt-2 leading-[23px] font-medium list-none flex items-center gap-3'>
                        <li><p>About Us</p></li>
                        <li><p>What We Do</p></li>
                        <li><p>Investment</p></li>
                    </ul>
                </div>
            </div>
            <div className='py-5'>
                <div className='relative flex flex-col md:flex-row justify-center items-center gap-2 md:gap-5'>
                <div className="absolute h-[2px] w-1/4 bg-white top-1/2 right-20 hidden md:block"></div>
                    <p className='text-center font-normal'>Copyright &copy; 2024 </p>
                    <p className='text-center font-normal'>
                        <Link to='/'>www.ztfbooks.com</Link>
                    </p>
                    <div className="absolute h-[2px] w-1/4 bg-white top-1/2 left-20 hidden md:block"></div>
                </div>
            </div>
        </div>
    )
}

export default Footer
