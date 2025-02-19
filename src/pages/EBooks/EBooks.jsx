import React from 'react'
import BookCard from '../../components/BookCard/BookCard'
import BookCoverImage from '../../assets/images/BookCoverImage.png'
import { useSelector } from 'react-redux'

const EBooks = () => {
    const products = useSelector((state) => state?.cart?.products);


    const books = [
        {
            image: BookCoverImage,
            title: "Human Soul",
            rating: "5.0",
            author: "James Hook",
            duration: "45 min",
            category: "Audiobook",
        },
        {
            image: BookCoverImage,
            title: "Human Soul",
            rating: "5.0",
            author: "James Hook",
            duration: "45 min",
            category: "Audiobook",
        },
        {
            image: BookCoverImage,
            title: "Human Soul",
            rating: "5.0",
            author: "James Hook",
            duration: "45 min",
            category: "Audiobook",
        },
        {
            image: BookCoverImage,
            title: "Human Soul",
            rating: "5.0",
            author: "James Hook",
            duration: "45 min",
            category: "Audiobook",
        },
    ];

  return (
    <div className='px-5 md:px-20 py-5 bg-[#f4f3f4]'>
            {/* Book Details */}
            <h1 className='bg-[#F7F8F8] my-3 p-3 rounded-xl text-[#203949] text-3xl font-medium'>Ebooks</h1>
            {/* Bought more section */}
            <section className='mt-5'>
                <h4 className='text-[#203949] text-xl text-center md:text-start font-semibold'>PDF Books</h4>
                <div className="flex mt-5 flex-wrap items-center justify-center md:justify-start gap-5">
                    <BookCard books={products} />
                </div>
            </section>
           
        </div>
  )
}

export default React.memo(EBooks)
