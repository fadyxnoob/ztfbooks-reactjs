import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BookCard from "../../components/BookCard/BookCard";
import service from "../../API/DBService";
import Loader from "../../components/Loader/Loader";

const SearchPage = () => {
  const [filteredBooks, setFilteredBooks] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q");
  const apiKey = import.meta.env.VITE_GET_ALL_APPROVED_BOOKS_API_KEY;
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await service.getApprovedBooks(apiKey);
        const allBooks = response.content ? response.content : []; // Directly use response if books are in it

        // Filter the books
        const results = allBooks.filter((book) => {
          const matchesTitle = book.ebookTitle && book.ebookTitle.toLowerCase().includes(query.toLowerCase());
          const matchesAuthor = book.author.name && book.author.name.toLowerCase().includes(query.toLowerCase());
          return matchesTitle || matchesAuthor;
        });

        setFilteredBooks(results);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    if (query) {
      fetchBooks();
    }
  }, [query]);

  return (
    <section className="my-10 px-5 md:px-20">
      <h2 className="text-xl font-medium text-gray-600">
        {query ? `You searched for "${query}"` : "Showing all books"}
      </h2>
      <div className={`mt-10 grid grid-cols-1 sm:grid-cols-2 ${!loading ? `md:grid-cols-4` : `md:grid-cols-1 w-full`} gap-5`}>
        {loading ? (
           <Loader />
        ) : filteredBooks.length > 0 ? (
          <BookCard books={filteredBooks} />
        ) : (
          <p>No books found matching your query.</p>
        )}
      </div>
    </section>
  );
};

export default SearchPage;
