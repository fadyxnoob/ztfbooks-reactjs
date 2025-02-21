import React, { useEffect, useState } from 'react'
import BookCard from '../../components/BookCard/BookCard';
import service from '../../API/DBService';
import Loader from '../../components/Loader/Loader';



const RecommendedBooks = () => {
    const [bestSalesBooks, setBestSalesBooks] = useState([]);
    const [loading, setLoading] = useState(true)
  // Fetch best-selling books
  const getBestSellingBooks = async () => {
    try {
      const res = await service.getBestSalesBooks(100);
      if (res && res.length > 0) {
        const formattedBooks = await Promise.all(
          res.map(async (book) => {
            try {
              const singleBook = await service.getBookByID(book.ebookId);
              return {
                title: book.ebookTitle,
                thumbnailFileName: book.ebookThumbNail,
                author: book.author?.name || "Unknown Author",
                duration: book.timeToRead || "N/A",
                category: book.categories?.[0]?.name || "N/A",
                id: book.ebookId,
                detailedInfo: singleBook?.data,
              };
            } catch (error) {
              console.error(
                `Failed to fetch book details for ID: ${book.ebookId}`,
                error
              );
              return null;
            }
          })
        );
        setBestSalesBooks(formattedBooks.filter(Boolean));
        setLoading(false)
      }
    } catch (error) {
      console.error("Failed to fetch best-selling books:", error);
    }
  };

    useEffect(() => {
        getBestSellingBooks();
    }, []);
    if(loading){
        return <Loader />
    }
    return (
        <div className='px-5 md:px-20 py-5 bg-[#f4f3f4]'>
            <h1 className='bg-[#F7F8F8] my-3 p-3 rounded-xl text-[#203949] text-3xl font-medium'>Best Selling Ebooks</h1>
            
            {/* Section for approved eBooks */}
            <section className='mt-5'>
                {/* <h4 className='text-[#203949] text-xl text-center md:text-start font-semibold'>PDF Books</h4> */}
                <div className="flex mt-5 flex-wrap items-center justify-center md:justify-start gap-5">
                    <BookCard books={bestSalesBooks} />
                </div>
            </section>

        </div>
    );
}

export default RecommendedBooks
