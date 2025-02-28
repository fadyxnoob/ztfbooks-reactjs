import React, { useEffect, useState } from "react";
import service from "../../API/DBService";
import { Link } from "react-router-dom";
import SeriesCategoryCard from "../../components/Categories/SeriesCategoryCard";
import Loader from "../../components/Loader/Loader";

const SeriesPage = () => {
  const [allSeries, setAllSeries] = useState([]);
  const [approvedEBooks, setApprovedEBooks] = useState([]);
  const apiKey = import.meta.env.VITE_GET_ALL_APPROVED_BOOKS_API_KEY;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksPromise = service.getApprovedBooks(apiKey);
        const seriesPromise = service.getAllCategories();

        const [booksRes, seriesRes] = await Promise.all([booksPromise, seriesPromise]);

        if (booksRes?.content) setApprovedEBooks(booksRes.content);
        if (seriesRes) setAllSeries(seriesRes);
      } catch (err) {
        console.error("❌ Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="px-5 md:px-20 py-5 bg-[#f4f3f4]">
      <h1 className="bg-[#F7F8F8] my-3 p-3 rounded-xl text-[#203949] text-3xl font-medium">
        Series
      </h1>

      {loading ? (
        <Loader /> // ✅ Show loader while data is being fetched
      ) : allSeries.length > 0 ? (
        allSeries.map((series) => {
          const filteredBooks = approvedEBooks.filter((book) =>
            book.categories?.some((category) => category.name === series.name)
          );

          return (
            <section className="my-10" key={series.id}>
              <div className="flex items-center justify-between mb-5 mt-10">
                <h4 className="text-[#203949] text-xl font-semibold">{series.name}</h4>
                <Link to={`series/${series.name}`} className="text-blue-600">
                  See All
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5 justify-items-center">
                {filteredBooks.length > 0 ? (
                  filteredBooks.slice(0, 5).map((book) => (
                    <SeriesCategoryCard key={book.id} book={book} seriesName={series.name} />
                  ))
                ) : (
                  <p className="text-gray-500 text-center md:text-start">
                    No books available in this series.
                  </p>
                )}
              </div>
            </section>
          );
        })
      ) : (
        <p className="text-center text-gray-500">No series available.</p>
      )}
    </div>
  );
};

export default React.memo(SeriesPage);
