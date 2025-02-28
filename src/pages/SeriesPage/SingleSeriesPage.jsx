import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import service from '../../API/DBService';
import SeriesCategoryCard from '../../components/Categories/SeriesCategoryCard';
import Loader from '../../components/Loader/Loader';

const SingleSeriesPage = () => {
  const { seriesName } = useParams();
  const [approvedEBooks, setApprovedEBooks] = useState([]);
  const apiKey = import.meta.env.VITE_GET_ALL_APPROVED_BOOKS_API_KEY;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksRes = await service.getApprovedBooks(apiKey);
        if (booksRes?.content) {
          setApprovedEBooks(booksRes.content);
        }
      } catch (err) {
        console.error('❌ Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter books that belong to the selected series
  const filteredBooks = approvedEBooks.filter((book) =>
    book.categories?.some((category) => category.name === seriesName)
  );
  
  return (
    <div className="px-5 md:px-20 py-5 bg-[#f4f3f4]">
      <h1 className="bg-[#F7F8F8] my-3 p-3 rounded-xl text-[#203949] text-3xl font-medium">
        {seriesName}
      </h1>

      {loading ? (
        <Loader />
      ) : filteredBooks.length > 0 ? (
        <section className="my-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5 justify-items-center">
            {filteredBooks.map((book) => (
              <SeriesCategoryCard key={book.id} book={book} seriesName={seriesName} />
            ))}
          </div>
        </section>
      ) : (
        <p className="text-gray-500 text-center md:text-start">
          No books available in this series.
        </p>
      )}
    </div>
  );
};

export default React.memo(SingleSeriesPage);
