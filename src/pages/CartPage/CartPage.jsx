import React, { useState } from 'react'
import BookCoverImage from '../../assets/images/BookCoverImage.png'
import { FaStar } from "react-icons/fa";
import Button from '../../components/Button/Button';
import BookCard from '../../components/BookCard/BookCard';
import { useSelector } from 'react-redux';

const CartPage = () => {
    
    const products = useSelector((state) => state?.cart?.products);

    const totalQuantity = products?.reduce((sum, product) => sum + product.quantity, 0) || 0;
    const totalPrice = products?.reduce((sum, product) => sum + (product.price * product.quantity), 0) || 0;

    // Unit price
    const averageUnitPrice = totalQuantity > 0 ? (totalPrice / totalQuantity).toFixed(2) : 0;

    // const {books, setBooks} = useState(products);
    const books = [
        {
            image: BookCoverImage,
            title: "Human Soul",
            rating: "5.0",
            author: "James Hook",
            duration: "45 min",
            category: "Audiobook",
            date: '25 Dec 2024',
            price: '$2',
        },
        {
            image: BookCoverImage,
            title: "Human Soul",
            rating: "5.0",
            author: "James Hook",
            duration: "45 min",
            category: "Audiobook",
            date: '25 Dec 2024',
            price: '$2',
        },
        {
            image: BookCoverImage,
            title: "Human Soul",
            rating: "5.0",
            author: "James Hook",
            duration: "45 min",
            category: "Audiobook",
            date: '25 Dec 2024',
            price: '$2',
        },
    ];

    return (
        <div className='px-5 md:px-20 py-5 bg-[#f4f3f4]'>
            <h1 className='bg-[#F7F8F8] my-3 p-3 rounded-xl text-[#203949] text-3xl font-medium'>Cart</h1>
            <div className='my-10 flex items-start gap-[30px]'>
                <div className='md:w-[70%]'>
                    {products?.map((book, i) => {
                        return (
                            <div 
                                key={i}
                            className='my-2 drop-shadow-[0_0_4px_rgba(0,0,0,0.25)] md:h-[100px] p-3 rounded-lg flex flex-col md:flex-row items-center w-full bg-white'>
                                <div className='flex justify-between w-full md:w-auto'>
                                    <div className='h-[68px] w-[60px] border border-[#D9D9D9]'>
                                        <img src={book.image} alt="" />
                                    </div>
                                    <div className='md:hidden'>
                                        <h3 className='text-xl font-medium text-[#203949]'>{book.title}</h3>
                                        <div className='flex items-center gap-2 mt-2'>
                                            <p className='text-[#7C7C7C] text-sm font-normal'>4.0</p> <FaStar className='text-[#FFCC68]' />                              </div>
                                    </div>
                                </div>

                                <div className='w-full p-2 flex flex-wrap items-center justify-between'>
                                    <div className='hidden md:block'>
                                        <h3 className='text-xl font-medium text-[#203949]'>The Nature</h3>
                                        <div className='flex items-center gap-2 mt-2'>
                                            <p className='text-[#7C7C7C] text-sm font-normal'>4.0</p> <FaStar className='text-[#FFCC68]' />                              </div>
                                    </div>
                                    <div className=''>
                                        <h3 className='text-xl font-medium text-[#203949]'>Author</h3>
                                        <p className='mt-2 text-[#7C7C7C] text-sm font-normal'>MexWell</p>
                                    </div>
                                    <div className=''>
                                        <h3 className='text-xl font-medium text-[#203949]'>Type</h3>
                                        <p className='mt-2 text-[#7C7C7C] text-sm font-normal'>Ebook Audio</p>
                                    </div>
                                    <div className=''>
                                        <h3 className='text-xl font-medium text-[#203949]'>Price</h3>
                                        <p className='mt-2 text-[#7C7C7C] text-sm font-normal'>{book.price}</p>
                                    </div>
                                    <div>
                                        <p className='text-[#7C7C7C] text-sm font-normal'>{book.date}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>
                <div className='md:w-[30%]'>
                    <div className="rounded-lg bg-white p-3">
                        <h4 className='text-center text-[#7C7C7C] text-lg font-bold'>Order Summary</h4>
                        <div className="mt-5">
                            <div className='flex justify-between items-center'>
                                <p className='text-[#7C7C7C] text-lg font-medium'>Quantity</p>
                                <p className='text-[#203949] text-lg font-medium'>{totalQuantity}</p>
                            </div>
                            <div className='flex justify-between items-center mt-3'>
                                <p className='text-[#7C7C7C] text-lg font-medium'>price/unit</p>
                                    <p className='text-[#203949] text-lg font-medium'>${averageUnitPrice}</p>
                            </div>
                            <div className='flex justify-between items-center mt-3 border-t border-[#EFEFEF] pt-3'>
                                <p className='text-[#203949] text-lg font-medium'>Total</p>
                                <p className='text-[#203949] text-lg font-medium'>{totalPrice}</p>
                            </div>
                        </div>
                    </div>
                    {/* cart button */}
                    <Button classNames='text-white rounded-3xl bg-[#01447E] mt-10 w-full py-3 text-xl font-medium'>Checkout</Button>
                </div>
            </div>

            {/* books section */}
            <section className='my-10'>
                <h4 className='text-black text-lg text-center md:text-start font-medium'>Recent Ebooks</h4>
                <div className="flex mt-10 flex-wrap items-center justify-center md:justify-start gap-5">
                    <BookCard books={books} />
                </div>
            </section>
        </div>
    )
}

export default CartPage
