import React, { useEffect, useState } from "react";
import service from "../../API/DBService";
import Loader from "../../components/Loader/Loader";
import BookCard from "../../components/BookCard/BookCard";


const SpecialDiscount = () => {
  const [approvedEBooks, setApprovedEBooks] = useState([]);
  const apiKey = import.meta.env.VITE_GET_ALL_APPROVED_BOOKS_API_KEY;
  const [loading, setLoading] = useState(true);


  // Fetch approved e-books
  const getApprovedBooks = async () => {
    try {
      const res = await service.getApprovedBooks(apiKey);
      const approvedBooks = res.content.slice(0, 10);
      setApprovedEBooks(approvedBooks || []);
      setLoading(false)
    } catch (err) {
      console.error("Failed to fetch approved books:", err);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getApprovedBooks()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Filter books based on conditions
  const filterBooks = (books, conditions) => {
    return books.filter((book) => {
      if (conditions.minAmount && book.amount < conditions.minAmount)
        return false;
      if (conditions.status && book.status !== conditions.status) return false;
      return true;
    });
  };


  const specialDiscountBooks = filterBooks(approvedEBooks, {
    minAmount: 0,
    status: "APPROVED",
  });

  if (loading) {
    return <Loader />
  }





  return (
    <div className="px-5 md:px-20 py-5 bg-[#f4f3f4]">
      <h1 className="bg-[#F7F8F8] my-3 p-3 rounded-xl text-[#203949] text-3xl font-medium">
        Special Discount Ebooks
      </h1>

      {/* Section for approved eBooks */}
      <section className="mt-5">
        {/* <h4 className='text-[#203949] text-xl text-center md:text-start font-semibold'>PDF Books</h4> */}
        <div className="flex mt-5 flex-wrap items-center justify-center md:justify-start gap-5">
          <BookCard books={specialDiscountBooks} />
        </div>
      </section>
    </div>
  );
};

export default SpecialDiscount;
