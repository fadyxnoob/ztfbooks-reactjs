import React, { useEffect, useState } from "react";
import HorizontalCard from "../HorizontalCard/HorizontalCard";
import service from "../../API/DBService";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("bestSelling");
  const [bestSalesBooks, setBestSalesBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [approvedEBooks, setApprovedEBooks] = useState([]);
  const apiKey = import.meta.env.VITE_GET_ALL_APPROVED_BOOKS_API_KEY;

  const getBestSellingBooks = async () => {
    try {
      const res = await service.getBestSalesBooks(5);
      //   console.log(res);
      if (res && res.length > 0) {
        const formattedBooks = await Promise.all(
          res.map(async (book) => {
            const singleBook = await service.getBookByID(book.ebookId); // Await here
            return {
              title: book.ebookTitle,
              image: book.ebookThumbNail,
              author: book.author?.name || "Unknown",
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
      }
    } catch (error) {
      console.error("Failed to fetch best-selling books:", error);
    }
  };

  const toggleFavorite = (book) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.id === book.id)) {
        return prevFavorites.filter((fav) => fav.id !== book.id);
      } else {
        return [...prevFavorites, book];
      }
    });
  };

  const tabs = [
    { id: "bestSelling", label: "Best Selling" },
    { id: "freeBooks", label: "Free Books" },
    { id: "topFree", label: "Top Free" },
  ];

  // get all approved e-books
  const getApprovedBooks = async () => {
    try {
      const res = await service.getApprovedBooks(apiKey);
      if (res && res.content.length > 0) {
        const formattedBooks = await Promise.all(
          res.content.map(async (book) => {
            const singleBook = await service.getBookByID(book.id);
            return {
              title: book.ebookTitle,
              image: book.thumbnailFileName,
              category: book.categories?.[0]?.name || "N/A",
              id: book.id,
              duration: book.duration,
              detailedInfo: singleBook?.data,
            };
          })
        );
        setApprovedEBooks(formattedBooks);
      } else {
        console.warn("No books found in API response.");
      }
    } catch (err) {
      console.error("Failed to fetch approved books:", err);
    }
  };

  const filterBooks = (books, filterConditions) => {
    return books.filter((book) => {
      let isMatch = true;

      // Filter by status (only books that are "APPROVED" in detailedInfo)
      if (
        filterConditions.detailedInfo?.status &&
        book.detailedInfo?.status !== filterConditions.detailedInfo.status
      ) {
        isMatch = false;
      }

      // Filter by freeBook (only books marked as free in detailedInfo)
      if (
        filterConditions.detailedInfo?.freeBook !== undefined &&
        book.detailedInfo?.freeBook !== filterConditions.detailedInfo.freeBook
      ) {
        isMatch = false;
      }

      return isMatch;
    });
  };

  // Define filter conditions
  const filterDiscount = {
    detailedInfo: {
      status: "APPROVED", 
      freeBook: true, 
    },
  };

  // Usage
  const specialDiscountBooks = filterBooks(approvedEBooks, filterDiscount);
  const displayBooksOnly = specialDiscountBooks.slice(0, 8)

  useEffect(() => {
    getBestSellingBooks();
    getApprovedBooks();
  }, []);
  const limitized = bestSalesBooks.slice(0, 10)
  return (
    <div className="w-full mx-auto">
      <div className="flex md:w-1/2 justify-between gap-2 md:gap-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`w-1/3 md:w-1/2 py-2 md:py-4 text-center font-medium text-gray-700 cursor-pointer ${
              activeTab === tab.id ? "bg-gray-200 rounded-full" : "border rounded-full"
            }
                            focus:outline-none`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        className={`p-4 ${activeTab === "bestSelling" ? "block" : "hidden"}`}
      >
        <div className="flex mt-10 flex-wrap items-center justify-center md:justify-start gap-3">
          {bestSalesBooks.length > 0 ? (
            <HorizontalCard
              books={limitized}
              toggleFavorite={toggleFavorite}
              favorites={favorites}
            />
          ) : (
            <p className="text-gray-600">No books found</p>
          )}
        </div>
      </div>

      <div className={`p-4 ${activeTab === "freeBooks" ? "block" : "hidden"}`}>
        <div className="flex mt-10 flex-wrap items-center justify-center md:justify-start gap-3">
          {specialDiscountBooks.length > 0 ? (
            <HorizontalCard
              books={displayBooksOnly}
              toggleFavorite={toggleFavorite}
              favorites={favorites}
            />
          ) : (
            <p className="text-gray-600">No books found</p>
          )}
        </div>
      </div>

      <div className={`p-4 ${activeTab === "topFree" ? "block" : "hidden"}`}>
        <div className="flex mt-10 flex-wrap items-center justify-center md:justify-start gap-3">
        {specialDiscountBooks.length > 0 ? (
            <HorizontalCard
              books={displayBooksOnly}
              toggleFavorite={toggleFavorite}
              favorites={favorites}
            />
          ) : (
            <p className="text-gray-600">No books found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Tabs);
