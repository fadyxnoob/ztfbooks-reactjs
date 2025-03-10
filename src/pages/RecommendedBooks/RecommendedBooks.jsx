import React, { useEffect, useState } from 'react'
import BookCard from '../../components/BookCard/BookCard';
import service from '../../API/DBService';

const RecommendedBooks = () => {
    const [approvedEBooks, setApprovedEBooks] = useState([]);

    const getApprovedBooks = async () => {
        try {
            const apiKey = import.meta.env.VITE_GET_ALL_APPROVED_BOOKS_API_KEY;
            const res = await service.getApprovedBooks(apiKey);
            setApprovedEBooks(res.content);
        } catch (err) {
            console.error('Failed to fetch approved books:', err);
        }
    };

    useEffect(() => {
        getApprovedBooks();
    }, []);

    return (
        <div className='px-5 md:px-20 py-5 bg-[#f4f3f4]'>
            <h1 className='bg-[#F7F8F8] my-3 p-3 rounded-xl text-[#203949] text-3xl font-medium'>Recommended Ebooks</h1>
            
            {/* Section for approved eBooks */}
            <section className='mt-5'>
                {/* <h4 className='text-[#203949] text-xl text-center md:text-start font-semibold'>PDF Books</h4> */}
                <div className="flex mt-5 flex-wrap items-center justify-center md:justify-start gap-5">
                    <BookCard books={approvedEBooks} />
                </div>
            </section>

        </div>
    );
}

export default RecommendedBooks
