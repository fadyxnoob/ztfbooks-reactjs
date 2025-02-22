import React, { useCallback, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Button from "../../components/Button/Button";
import BookCard from "../../components/BookCard/BookCard";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import ReviewImage from "../../assets/images/review-image.png";
import { useParams } from "react-router-dom";
import service from "../../API/DBService";
import DOMPurify from "dompurify";
import Alert from "../../components/Alert/Alert";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Store/cartSlice";
import Loader from "../../components/Loader/Loader";
import ShareButton from "../../components/share/share";
import BookReview from "../../components/add-review/addReview";

const BookDetail = () => {
  const { bookID } = useParams();
  const [bookDetail, setBookDetail] = useState();
  const [bookImage, setBookImage] = useState("");
  const [approvedEBooks, setApprovedEBooks] = useState([]);
  const apiKey = import.meta.env.VITE_GET_ALL_APPROVED_BOOKS_API_KEY;
  const dispatch = useDispatch();
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);
  const [reviews, setReviews] = useState([]);


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
      const booksResponse = res.content.slice(0, 4);
      setApprovedEBooks(booksResponse);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch approved books:", err);
    }
  };

  const getBookReviews = useCallback(async (bookID) => {
    const response = await service.getReviewesByBookID(bookID);
    console.log({ response });
    setReviews(response?.reviewComments);
  }, []);

  useEffect(() => {
    getApprovedBooks();
    getBookReviews(bookID);
  }, []);

  // Function to add book to the cart
  const handleAddToCart = (ebookId, quantity, name, price) => {
    if (!authStatus) {
      return showAlert("error", "Please login first...");
    }

    if (!ebookId || !quantity || !name || !price) {
      console.error("Invalid cart item:", { ebookId, quantity, name, price });
      return;
    }

    try {
      dispatch(addToCart({ ebookId, quantity, name, price }));
      showAlert("success", "Item add to the cart");
    } catch (error) {
      showAlert("error", "Failed to add item ");
    }

  };

  // const reviews = [
  //   {
  //     name: "Ahmed Khan",
  //     image: ReviewImage, // Replace with actual image
  //     rating: 4.0,
  //     date: "02 June 2024",
  //     text: "Lorem ipsum dolor sit amet consectetur. Sagittis suscipit amet diam eu magna tortor arcu dui. Dignissim elementum curabitur orci lobortis tortor.Lorem ipsum dolor sit amet consectetur. Sagittis suscipit amet diam eu ]r.  ",
  //   },
  //   {
  //     name: "Sarah Ali",
  //     image: ReviewImage,
  //     rating: 5.0,
  //     date: "10 July 2024",
  //     text: "Lorem ipsum dolor sit amet consectetur. Sagittis suscipit amet diam eu magna tortor arcu dui. Dignissim elementum curabitur orci lobortis tortor.Lorem ipsum dolor sit amet consectetur. Sagittis suscipit amet diam eu ]r.  ",
  //   },
  // ];

  if (loading) {
    return <Loader />;
  }

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
          Ebook Details
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
              <p className="text-[#7C7C7C] text-lg">{bookDetail?.rating}</p>
              <FaStar className="text-[#FFCC68] text-xl" />
            </div>
            <div className="my-5 flex">
              <h2 className="text-[#203949] text-xl font-medium">Author: </h2>
              <p className=" ml-1 text-[#203949] text-lg">
                {bookDetail?.author?.name}
              </p>
            </div>
            <div className="my-5">
              <h2 className="text-[#333333] text-xl font-medium">
                Description
              </h2>
              <p
                className="mt-2 text-[#203949] font-medium"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(bookDetail?.description),
                }}
              />
            </div>
            <div className="my-5 flex gap-5">
              <div>
                <p className="font-medium text-lg text-[#7C7C7C]">Price</p>
                <p className="text-[#203949] text-lg font-medium">
                  {bookDetail?.currency?.code}{" "}
                  {bookDetail?.currency?.rateToDefault}
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
                <BookReview ebookId={bookID} callReviews={getBookReviews}/>
              </div>
            </div>
            <div className="my-5">
              <Button
                classNames="bg-[#01447E] rounded-full w-full h-[50px] text-white font-medium text-lg cursor-pointer disabled:opacity-50"
                onClick={() =>
                  handleAddToCart(
                    bookDetail?.id,
                    1,
                    bookDetail?.ebookTitle,
                    bookDetail?.amount
                  )
                }
                disabled={loading}
              >
                {loading ? "Adding..." : "Add to Cart"}
              </Button>
            </div>
          </div>
        </div>

        {/* Also Bought Section */}
        <section className="mt-20">
          <h4 className="text-[#203949] text-xl text-center md:text-start font-semibold">
            Also Bought Book
          </h4>
          <div className="flex mt-2 flex-wrap items-center justify-center md:justify-start gap-5">
            <BookCard books={approvedEBooks} />
          </div>
        </section>

        {/* More from Author */}
        <section className="mt-20 p-3">
          <h2 className="text-2xl text-black font-medium">More from Author</h2>
          <div className="flex justify-center md:justify-between items-start flex-wrap mt-5 gap-10 md:gap-0">
            <BookCard books={approvedEBooks} />
          </div>
        </section>

        {/* reviews section */}
        <section className="my-10 bg-[#EBEBEB] pt-10 pb-3 px-3">
          <h2 className="text-[#203949] text-2xl font-semibold">
            Reviews on {bookDetail?.ebookTitle} Ebook
          </h2>
          <div className="mt-10 flex flex-col gap-5">
            <ReviewCard reviews={reviews} />
          </div>
        </section>
      </div>
    </>
  );
};

export default React.memo(BookDetail);
