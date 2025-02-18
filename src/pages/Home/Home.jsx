import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";
import BookCard from "../../components/BookCard/BookCard";
import Tabs from "../../components/Tabs/Tabs";
import { useSelector } from "react-redux";
import { getLocalStorage } from "../../LocalStorage/LocalStorage";
import service from "../../API/DBService";

const Home = () => {
  const loggedInUser =
    useSelector((state) => state.auth.userdata) || getLocalStorage("userdata");
  const [approvedEBooks, setApprovedEBooks] = useState([]);
  const [bestSalesBooks, setBestSalesBooks] = useState([]);
  const apiKey = import.meta.env.VITE_GET_APPROVED_BOOKS_API_KEY;

  // Get all approved e-books
  const getApprovedBooks = async () => {
    try {
      const res = await service.getApprovedBooks(apiKey);
      if (res && res.content) {
        setApprovedEBooks(res.content);
      } else {
        console.warn("No content found in the API response.");
        setApprovedEBooks([]);
      }
    } catch (err) {
      console.error("Failed to fetch approved books:", err);
      setApprovedEBooks([]);
    }
  };

  // Get best-selling books
  const getBestSellingBooks = async () => {
    try {
      const res = await service.getBestSalesBooks(4);
      if (res && res.length > 0) {
        const formattedBooks = await Promise.all(
          res.map(async (book) => {
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
          })
        );
        setBestSalesBooks(formattedBooks);
      } else {
        console.warn("No books found in API response.");
        setBestSalesBooks([]);
      }
    } catch (error) {
      console.error("Failed to fetch best-selling books:", error);
      setBestSalesBooks([]);
    }
  };

  // Filter books based on conditions
  const filterBooks = (books, filterConditions) => {
    if (!Array.isArray(books)) {
      console.warn("Expected an array of books, but received:", books);
      return [];
    }

    return books.filter((book) => {
      let isMatch = true;
      if (
        filterConditions.minAmount &&
        book.amount < filterConditions.minAmount
      ) {
        isMatch = false;
      }
      if (filterConditions.status && book.status !== filterConditions.status) {
        isMatch = false;
      }
      return isMatch;
    });
  };

  // Define filter conditions
  const filterDiscount = {
    minAmount: 0,
    status: "APPROVED",
  };

  const specialDiscountBooks = filterBooks(approvedEBooks, filterDiscount);

  useEffect(() => {
    getApprovedBooks();
    getBestSellingBooks();
  }, []);

  return (
    <div className="bg-[#f4f3f4]">
      <Banner />
      {/* Recent books section */}
      <section className="my-10 px-5 md:px-20">
        <h4 className="text-black text-lg text-center md:text-start font-medium">
          Recent Ebooks
        </h4>
        <div className="flex mt-10 flex-wrap items-center justify-center md:justify-start gap-5">
          <BookCard books={approvedEBooks} />
        </div>
      </section>

      {/* Top Chart section */}
      <section className="my-10 py-2 bg-white mx-5 md:mx-20 ps-5">
        <h4 className="text-black text-lg text-center md:text-start font-medium">
          Top Chart
        </h4>
        <div className="my-5">
          <Tabs />
        </div>
      </section>

      {/* Recommended Books section */}
      <section className="my-10 px-5 md:px-20">
        <h4 className="text-black text-lg text-center md:text-start font-medium">
          Recommended Books
        </h4>
        <div className="flex mt-10 flex-wrap items-center justify-center md:justify-start gap-5">
          <BookCard books={approvedEBooks} />
        </div>
      </section>

      {/* Best Selling Books section */}
      <section className="my-10 px-5 md:px-20">
        <h4 className="text-black text-lg text-center md:text-start font-medium">
          Best Selling Books
        </h4>
        <div className="flex mt-10 flex-wrap items-center justify-center md:justify-start gap-5">
          <BookCard books={bestSalesBooks} />
        </div>
      </section>

      {/* Special Discounts section */}
      <section className="my-10 px-5 md:px-20">
        <h4 className="text-black text-lg text-center md:text-start font-medium">
          Special Discount
        </h4>
        <div className="flex mt-10 flex-wrap items-center justify-center md:justify-start gap-5">
          <BookCard books={specialDiscountBooks} />
        </div>
      </section>
    </div>
  );
};

export default Home;