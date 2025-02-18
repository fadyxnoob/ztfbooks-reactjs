import React from 'react'
import BookCard from '../../components/BookCard/BookCard'
import BookCoverImage from '../../assets/images/BookCoverImage.png'
import HorizontalCard from '../../components/HorizontalCard/HorizontalCard'
const MyFavourite = () => {

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
        <div className='px-5 md:px-20'>
            <section className='my-10'>
                <h4 className='text-[#203949] text-3xl text-center md:text-start font-medium'>My Favourite</h4>
                <div className="flex mt-10 flex-wrap items-center justify-center md:justify-start gap-5">
                    <BookCard books={books} />
                </div>
            </section>

            <section className='my-10 py-2 bg-white '>
                <div className="flex mt-10 flex-wrap items-center justify-center md:justify-start gap-3">
                    <HorizontalCard books={books} />
                </div>
            </section>
        </div>
    )
}

export default React.memo(MyFavourite)
