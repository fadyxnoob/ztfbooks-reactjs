import React, { useEffect, useState } from 'react'
import Banner from '../../components/Banner/Banner'
import BookCard from '../../components/BookCard/BookCard'
import BookCoverImage from '../../assets/images/BookCoverImage.png'
import Tabs from '../../components/Tabs/Tabs'
import { useSelector } from 'react-redux'
import { getLocalStorage } from '../../LocalStorage/LocalStorage'
import service from '../../API/DBService'
const Home = () => {
    const loggedInUser = useSelector((state) => state.auth.userdata) || getLocalStorage('userdata')
    const [approvedEBooks, setApprovedEBooks] = useState([])
    const [bestSalesBooks, setBestSalesBooks] = useState([]);

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

    const getBestSellingBooks = async () => {
        try {
            const res = await service.getBestSalesBooks();
            // console.log('API Response:', res);
    
            if (res && res.length > 0) {
                const formattedBooks = await Promise.all(res.map(async (book) => {
                    // Fetch detailed book info by ID
                    const singleBook = await service.getBookByID(book.ebookId); // Assuming `book.id` is the correct ID to fetch the book details.
                    // console.log(singleBook.data)
                    return {
                        title: book.ebookTitle,
                        thumbnailFileName: book.ebookThumbNail,
                        author: book.author?.createdBy || 'Unknown Author',
                        duration: book.timeToRead || 'N/A',
                        category: book.categories?.[0]?.name || 'N/A',
                        id: book.id,
                        detailedInfo: singleBook?.data 
                    };
                }));
    
                setBestSalesBooks(formattedBooks);
            } else {
                console.warn('No books found in API response.');
            }
        } catch (error) {
            console.error('Failed to fetch best-selling books:', error);
        }
    };




    useEffect(() => {
        getBestSellingBooks()
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

    return (
        <div className='bg-[#f4f3f4]'>
            <Banner />
            {/* Recen books section */}
            <section className='my-10 px-5 md:px-20'>
                <h4 className='text-black text-lg text-center md:text-start font-medium'>Recent Ebooks</h4>
                <div className="flex mt-10 flex-wrap items-center justify-center md:justify-start gap-5">
                    <BookCard books={approvedEBooks} />
                </div>
            </section>

            {/* Top Chart section */}
            <section className='my-10 py-2 bg-white mx-5 md:mx-20 ps-5'>
                <h4 className='text-black text-lg text-center md:text-start font-medium'>Top Chart</h4>
                <div className="my-5">
                    <Tabs />
                </div>
            </section>

            {/* Recommended Books section */}
            <section className='my-10 px-5 md:px-20'>
                <h4 className='text-black text-lg text-center md:text-start font-medium'>Recommended Books</h4>
                <div className="flex mt-10 flex-wrap items-center justify-center md:justify-start gap-5">
                    <BookCard books={books} />
                </div>
            </section>

            {/* Best Selling Books section */}
            <section className='my-10 px-5 md:px-20'>
                <h4 className='text-black text-lg text-center md:text-start font-medium'>Best Selling Books</h4>
                <div className="flex mt-10 flex-wrap items-center justify-center md:justify-start gap-5">
                    <BookCard books={bestSalesBooks} />
                </div>
            </section>

            {/* Special Discounts section */}
            <section className='my-10 px-5 md:px-20'>
                <h4 className='text-black text-lg text-center md:text-start font-medium'>Special Discount</h4>
                <div className="flex mt-10 flex-wrap items-center justify-center md:justify-start gap-5">
                    <BookCard books={books} />
                </div>
            </section>
        </div>
    )
}

export default Home
