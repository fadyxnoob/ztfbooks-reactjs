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
  const [loading, setLoading] = useState(true);
  const apiKey = import.meta.env.VITE_GET_APPROVED_BOOKS_API_KEY;
  console.log({apiKey})
  // Fetch approved e-books
  const getApprovedBooks = async () => {
    try {
      const res = await service.getApprovedBooks(apiKey);
      console.log('approved res::',{res})
      setApprovedEBooks(res.content || []);
    } catch (err) {
      console.error("Failed to fetch approved books:", err);
    }
  };

  // Fetch best-selling books
  const getBestSellingBooks = async () => {
    try {
      const res = await service.getBestSalesBooks(4);
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
      }
    } catch (error) {
      console.error("Failed to fetch best-selling books:", error);
    }
  };

  // Filter books based on conditions
  const filterBooks = (books, conditions) => {
    return books.filter((book) => {
      if (conditions.minAmount && book.amount < conditions.minAmount)
        return false;
      if (conditions.status && book.status !== conditions.status) return false;
      return true;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getApprovedBooks(), getBestSellingBooks()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const specialDiscountBooks = filterBooks(approvedEBooks, {
    minAmount: 0,
    status: "APPROVED",
  });

  if (loading) {
    return (
      <div className="text-center py-20 text-xl">Loading, please wait...</div>
    );
  }

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
