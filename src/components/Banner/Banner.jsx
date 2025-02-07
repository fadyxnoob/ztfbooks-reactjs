import React from 'react'
import './style.css'
import Button from '../Button/Button'
const Banner = () => {
    return (
        <div className='bannerBGImage md:h-[600px] md:py-40 md:pl-20 text-white p-5'>
            <h1 className='font-bold text-3xl md:text-6xl text-center md:text-start'>Explore the  Best Ebook Store <br className='hidden md:block' /> with ZTF Books</h1>
            <p className="mt-6 md:mt-10 text-lg font-normal text-center md:text-start">Reading is to the mind what exercise is to the body: <br className='hidden md:block' /> A quote by Joseph Addison </p>
            <div className="mt-6 md:mt-10 mx-auto text-center md:text-start">
                <Button classNames='bg-[#01447E] py-2  px-3 h-[50px] w-[190px] rounded-lg text-center'>Explore More</Button>
            </div>
        </div>
    )
}

export default React.memo(Banner)
