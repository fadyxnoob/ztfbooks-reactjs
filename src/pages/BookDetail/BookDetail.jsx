import React, { useCallback, useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import Button from "../../components/Button/Button";
import BookCard from "../../components/BookCard/BookCard";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import { Link, useParams } from "react-router-dom";
import service from "../../API/DBService";
import Alert from "../../components/Alert/Alert";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Store/cartSlice";
import Loader from "../../components/Loader/Loader";
import ShareButton from "../../components/share/share";
import BookReview from "../../components/add-review/addReview";
import Description from "../../components/Description/Description";
import SeriesCategoryCard from "../../components/Categories/SeriesCategoryCard";
import Carousel from "../../components/Carousel/Carousel";

const BookDetail = () => {
  const { bookID } = useParams();
  const [bookDetail, setBookDetail] = useState();
  const [bookImage, setBookImage] = useState("");
  const [approvedEBooks, setApprovedEBooks] = useState([]);
  const apiKey = import.meta.env.VITE_GET_ALL_APPROVED_BOOKS_API_KEY;
  const dispatch = useDispatch();
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [dollarCurrency, setDollarCurrency] = useState('')
  const [filteredBooks, setFilteredBooks] = useState([]);

  // fetching book detail from API using book ID
  const fetchBook = async () => {
    const res = await service.getBookByID(bookID);
    setBookDetail(res.data);
    setLoading(false);
    const url = await service.getFileByName(res?.data?.thumbnailFileName);
    setBookImage(url);
  };

  useEffect(() => {
    fetchBook();
    window.scrollTo(0, 0);
  }, [bookID]);

  // Function to show alert
  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 2000);
  };

  // get all approved e-books
  const getApprovedBooks = async () => {
    try {
      const res = await service.getApprovedBooks(apiKey);
      // const booksResponse = res.content.slice(0, 4);
      setApprovedEBooks(res.content);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch approved books:", err);
    }
  };

  const getBookReviews = useCallback(async (bookID) => {
    const response = await service.getReviewesByBookID(bookID);
    setReviews(response?.reviewComments);
  }, []);

  useEffect(() => {
    getApprovedBooks();
    getBookReviews(bookID);
  }, []);

  const handleAddToCart = async (book) => {
    if (!book) {
      console.error("❌ Error: Book ID is missing!", book);
      return showAlert("error", "Book ID is missing!");
    }

    try {
      const result = await dispatch(addToCart(book));

      if (addToCart.fulfilled.match(result)) {
        showAlert("success", "Book added to cart!");
      } else {
        console.warn("⚠️ Add to Cart Failed!", result);
        showAlert("error", `${result.payload || "Unknown error"}`);
      }
    } catch (error) {
      console.error("❌ Unexpected Error:", error);
      showAlert("error", "Something went wrong while adding to cart!");
    }
  };

  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="my-3 flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} className="text-[#FFCC68] text-xl" />
        ))}
        {hasHalfStar && <FaStarHalfAlt className="text-[#FFCC68] text-xl" />}
      </div>
    );
  };

  useEffect(() => {
    const getCurrencyByID = async () => {
      const response = await service.getCurrencyByID(6)
      setDollarCurrency(response.rateToDefault)
    }
    getCurrencyByID()
  }, [])

  // Filter books that belong to the selected series
  useEffect(() => {
    if (approvedEBooks.length > 0 && bookDetail?.categories?.length > 0) {
      const filtered = approvedEBooks.filter((book) =>
        book.categories?.some((category) =>
          bookDetail.categories.some(
            (detailCategory) => detailCategory.name === category.name
          )
        )
      );
      setFilteredBooks(filtered);
    } else {
      console.log("❌ Skipping filter: Missing data.");
    }
  }, [approvedEBooks, bookDetail]);

  if (loading) return <Loader />;

  return (
    <>
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      {/* Book Details */}
      <div className="px-5 md:px-20 py-5 bg-[#f4f3f4]">
        <h1 className="bg-[#F7F8F8] my-3 p-3 rounded-xl text-[#203949] text-3xl font-medium">
          Book Details – Book Preview: Summary & Reviews
        </h1>
        <div className="my-5 flex flex-col md:flex-row gap-5 items-start">
          {/* Product Image */}
          <div className="w-full md:w-1/2 md:mt-3 mx-auto">
            <img
              src={bookImage ? bookImage : null}
              alt={bookImage}
              className="size-full object-contain"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-[#203949] text-2xl font-medium">
              {bookDetail?.ebookTitle}
            </h2>
            <div className="my-3 flex items-center gap-2">
              <StarRating rating={bookDetail?.rating} />

              <p className="text-[#7C7C7C] text-lg">({bookDetail?.rating})</p>
            </div>
            <div className="my-5 flex">
              <h2 className="text-[#203949] text-xl font-medium">Author: </h2>
              <p className=" ml-1 text-lg text-blue-600 underline">
                <Link
                  to={`/author/${bookDetail?.author?.id}`}
                >
                  {bookDetail?.author?.name}
                </Link>
              </p>
            </div>
            <div className="my-5 flex">
              <h2 className="text-[#203949] text-xl font-medium">Series: </h2>
              <p className=" ml-1 text-lg text-blue-600 underline">
                <Link
                  to={`/series/${bookDetail?.categories[0]?.name}`}
                >
                  {bookDetail?.categories[0]?.name}
                </Link>
              </p>
            </div>
            <Description description={bookDetail?.description} />
            <div className="my-5 flex gap-5">
              <div>
                <p className="font-medium text-lg text-[#7C7C7C]">Price</p>
                <p className="text-[#203949] text-lg font-medium">
                  {`$ ${bookDetail?.amount * dollarCurrency}`}
                </p>
              </div>
              <div>
                <p className="font-medium text-lg text-[#7C7C7C]">Pages</p>
                <p className="text-[#203949] text-lg font-medium">
                  {bookDetail?.numberOfPages}
                </p>
              </div>
              <div>
                <p className="font-medium text-lg text-[#7C7C7C]">Likes</p>
                <p className="text-[#203949] text-lg font-medium">
                  {bookDetail?.numberOfLikes}
                </p>
              </div>
              <div>
                <p className="font-medium text-lg text-[#7C7C7C]">Share</p>
                <ShareButton />
              </div>

              <div>
                <BookReview ebookId={bookID} callReviews={getBookReviews} />
              </div>
            </div>
            <div className="my-5">
              <Button
                classNames="bg-[#01447E] rounded-full w-full h-[50px] text-white font-medium text-lg cursor-pointer disabled:opacity-50"
                onClick={() => handleAddToCart(bookDetail?.id)}
                disabled={loading}
              >
                {loading ? "Adding..." : "Add to Cart"}
              </Button>
            </div>
          </div>
        </div>

        {/* Also Bought Section */}
        {loading ? (
          <Loader />
        ) : filteredBooks.length > 0 ? (
          <section className="my-10">
            <h2 className="text-2xl text-black font-medium">Also in the same series</h2>
            <div>
              <Carousel books={filteredBooks} pathTo={`/series/${bookDetail.categories[0].name}`} />
            </div>
          </section>
        ) : (
          <p className="text-gray-500 text-center md:text-start">
            No books available in this series.
          </p>
        )}

        {/* More from Author */}
        <section className="mt-20">
          <h2 className="text-2xl text-black font-medium">More from Author</h2>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-5">
            <BookCard books={approvedEBooks.slice(0, 4)} />
          </div>
        </section>

        {/* reviews section */}
        {
          reviews.length > 0 ? (
            <section className="my-10 bg-[#EBEBEB] pt-10 pb-3 px-3">
              <h2 className="text-[#203949] text-sm md:text-2xl font-semibold">
                Reviews on {bookDetail?.ebookTitle} Ebook
              </h2>
              <div className="mt-10 flex flex-col gap-5">
                <ReviewCard reviews={reviews} />
              </div>
            </section>
          ) : (
            <h2 className="text-[#203949] text-sm md:text-2xl font-semibold my-10 bg-[#EBEBEB] p-3 rounded ">
              No Reviews for {bookDetail?.ebookTitle} Ebook
            </h2>
          )
        }
      </div>
    </>
  );
};

export default React.memo(BookDetail);
