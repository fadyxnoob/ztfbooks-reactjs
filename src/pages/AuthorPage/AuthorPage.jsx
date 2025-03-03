import React, { useEffect, useState } from 'react';
import BookCard from '../../components/BookCard/BookCard';
import service from '../../API/DBService';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AuthorPage = () => {
    const {authorID} = useParams()
    const [approvedEBooks, setApprovedEBooks] = useState([]);
    const loadAuthorBooks = async () => {
        try {
            const res = await axios.get(`https://server.ztfbooks.com/opn/v1/e-books/author/${authorID}`);
            setApprovedEBooks(res?.data?.content)
        } catch (err) {
            console.error('Failed to load authors books::', err);
        }
    };

    useEffect(() => {
        loadAuthorBooks();
    }, []);
    return (
        <div className='px-5 md:px-20 py-5 bg-[#f4f3f4]'>
            <h1 className='bg-[#F7F8F8] my-3 p-3 rounded-xl text-[#203949] text-3xl font-medium'>Ebooks</h1>

            {/* Section for approved eBooks */}
            <section className='mt-5'>
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                    <BookCard books={approvedEBooks} />
                </div>
            </section>

        </div>
    );
}

export default React.memo(AuthorPage)
