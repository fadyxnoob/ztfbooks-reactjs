import React, { useEffect, useState } from 'react'
import image from '../../assets/images/BookCoverImage.png'
import { FaStar } from "react-icons/fa";
import Button from '../../components/Button/Button'
import BookCoverImage from '../../assets/images/BookCoverImage.png'
import BookCard from '../../components/BookCard/BookCard';
import AuthorCard from '../../components/AuthorCard/AuthorCard';
import AuthorImage from '../../assets/images/author.png'
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import ReviewImage from '../../assets/images/review-image.png'
import { useParams } from 'react-router-dom';
import service from '../../API/DBService';
import DOMPurify from 'dompurify'; // For sanitizing HTML

const BookDetail = () => {
    const { bookID } = useParams()
    const [bookDetail, setBookDetail] = useState()
    const [bookImage, setBookImage] = useState('')
    const [approvedEBooks, setApprovedEBooks] = useState([])

    // fetching book detail form api using book id 
    const fetchBook = async () => {
        const res = await service.getBookByID(bookID);
        // console.log(res.data)
        setBookDetail(res.data)
        const imageRes = await service.getFileByName(res?.data?.thumbnailFileName)
        // console.log({ imageRes })
        const url = URL.createObjectURL(imageRes.data);
        setBookImage(url)
    }

    useEffect(() => {
        fetchBook()
    }, [])
    // get all approved e-books
    const getApprovedBooks = async () => {
        try {
            const res = await service.getApprovedBooks(); // Capture the response here
            // console.log(res.content[0]); // Now this will work
            setApprovedEBooks(res.content);
        } catch (err) {
            console.error('Failed to fetch approved books:', err);
        }
    };

    useEffect(() => {
        getApprovedBooks()
    }, []);


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

    const authors = [
        {
            id: 'Ibrahim John',
            name: 'Ibrahim John',
            country: 'Australia',
            books: 40,
            authorImage: AuthorImage,
        }
    ]

    const reviews = [
        {
            name: "Ahmed Khan",
            image: ReviewImage, // Replace with actual image
            rating: 4.0,
            date: "02 June 2024",
            text: "Lorem ipsum dolor sit amet consectetur. Sagittis suscipit amet diam eu magna tortor arcu dui. Dignissim elementum curabitur orci lobortis tortor.Lorem ipsum dolor sit amet consectetur. Sagittis suscipit amet diam eu ]r.  "
        },
        {
            name: "Sarah Ali",
            image: ReviewImage,
            rating: 5.0,
            date: "10 July 2024",
            text: "Lorem ipsum dolor sit amet consectetur. Sagittis suscipit amet diam eu magna tortor arcu dui. Dignissim elementum curabitur orci lobortis tortor.Lorem ipsum dolor sit amet consectetur. Sagittis suscipit amet diam eu ]r.  "
        }
    ];


    return (
        <div className='px-5 md:px-20 py-5 bg-[#f4f3f4]'>
            {/* Book Details */}
            <h1 className='bg-[#F7F8F8] my-3 p-3 rounded-xl text-[#203949] text-3xl font-medium'>Ebook Details</h1>
            <div className="my-5 flex flex-col md:flex-row gap-5 items-start">
                {/* product image */}
                <div className='md:w-[700px] md:h-[540px] md:mt-3'>
                    <img src={bookImage} alt={bookImage} className='size-full object-fill' />
                </div>
                <div className='md:w-1/3'>
                    <h2 className='text-[#203949] text-2xl font-medium'>{bookDetail?.ebookTitle}</h2>
                    <div className='my-3 flex items-center gap-2'>
                        <p className='text-[#7C7C7C] text-lg'>{bookDetail?.rating}</p> <FaStar className='text-[#FFCC68] text-xl' />
                    </div>
                    <div className='my-5'>
                        <h2 className='text-[#203949] text-xl font-medium'>Author</h2>
                        <p className="mt-2 text-[#203949] text-lg">{bookDetail?.author?.name}</p>
                    </div>
                    <div className='my-5'>
                        <h2 className='text-[#333333] text-xl font-medium'>Description</h2>
                        <p
                            className="mt-2 text-[#203949] font-medium"
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(bookDetail?.description) }}
                        />
                    </div>
                    <div className="my-5 flex gap-5">
                        <div>
                            <p className='font-medium text-lg text-[#7C7C7C]'>Price</p>
                            <p className='text-[#203949] text-lg font-medium'>{bookDetail?.currency?.code} {bookDetail?.currency?.rateToDefault}</p>
                        </div>
                        <div>
                            <p className='font-medium text-lg text-[#7C7C7C]'>Pages</p>
                            <p className='text-[#203949] text-lg font-medium'>{bookDetail?.numberOfPages}</p>
                        </div>
                    </div>
                    <div className="my-5">
                        <Button classNames='bg-[#01447E] rounded-full w-full h-[50px] text-white font-medium text-lg cursor-pointer'>Add to Cart</Button>
                    </div>
                </div>
            </div>
            {/* Bought more section */}
            <section className='mt-20'>
                <h4 className='text-[#203949] text-xl text-center md:text-start font-semibold'>Also Bought Book</h4>
                <div className="flex mt-2 flex-wrap items-center justify-center md:justify-start gap-5">
                    <BookCard
                        books={approvedEBooks}
                    />
                </div>
            </section>

            {/* author section */}
            <section className="mt-20 p-3 bg-white">
                <h2 className='text-2xl text-black font-medium'>More from Authors</h2>
                <p className="mt-3 text-sm text-black font-normal">Meet the beautiful minds</p>
                <div className="flex justify-between items-start flex-wrap mt-5">
                    <AuthorCard authors={authors} />
                </div>
            </section>
            {/* reviews section */}
            <section className='my-10 bg-[#EBEBEB] pt-10 pb-3 px-3'>
                <h2 className='text-[#203949] text-2xl font-semibold'>Reviews on {bookDetail?.ebookTitle} Ebook</h2>
                <div className="mt-10 flex flex-col gap-5">
                    <ReviewCard reviews={reviews} />
                </div>
            </section>
        </div>
    )
}

export default React.memo(BookDetail)
