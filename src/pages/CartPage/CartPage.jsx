import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Button from "../../components/Button/Button";
import BookCard from "../../components/BookCard/BookCard";
import { useSelector } from "react-redux";
import service from "../../API/DBService";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart } from "../../Store/cartSlice";

const CartPage = () => {
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_GET_APPROVED_BOOKS_API_KEY;
  const [approvedEBooks, setApprovedEBooks] = useState([]);
  const [cartBooks, setCartBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const products = useSelector((state) => state?.cart?.products || []);
  const totalQuantity = products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );
  const totalPrice = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  const averageUnitPrice = totalQuantity > 0 ? (totalPrice / totalQuantity).toFixed(2) : 0;

  // Fetch approved eBooks
  const getApprovedBooks = async () => {
    try {
      const res = await service.getApprovedBooks(apiKey);
      if (res.content) {
        setApprovedEBooks(res.content);
        setLoading(false);
      }
    } catch (err) {
      console.error("Failed to fetch approved books:", err);
    }
  };
  const dispatch = useDispatch();

  const handleDelete = (bookId) => {
    const updatedCart = cartBooks.filter((book) => book.id !== bookId);
    setCartBooks(updatedCart);
    dispatch({ type: "cart/removeItem", payload: bookId });
  };

  useEffect(() => {
    if (!authStatus) {
      navigate("/login");
    }
    getApprovedBooks();
  }, []);

  // Fetch book details
  useEffect(() => {
    const fetchBookDetails = async () => {
      const updatedBooks = await Promise.all(
        products.map(async (book) => {
          try {
            const bookRes = await service.getBookByID(book.id);

            const file = bookRes.data.thumbnailFileName;
            const fileURL = await service.getFileByName(file);

            return {
              ...book,
              fileURL,
              category: bookRes.data.categories.name,
              author: bookRes.data.author.name,
              date: bookRes.data.publishDate,
            };
          } catch (err) {
            console.error(`Failed to fetch book ${book.id}:`, err);
            return { ...book, fileURL: null };
          }
        })
      );
      setCartBooks(updatedBooks);
    };

    if (products.length > 0) {
      fetchBookDetails();
    }
  }, [products]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="px-5 md:px-20 py-5 bg-[#f4f3f4]">
        <h1 className="bg-[#F7F8F8] my-3 p-3 rounded-xl text-[#203949] text-3xl font-medium">
          Cart
        </h1>
        <div className="my-10 flex flex-col md:flex-row items-start gap-5 md:gap-[30px]">
          <div className="w-full md:w-[70%]">
            {cartBooks?.length > 0 ? (
              cartBooks.map((book) => {
                return (
                  <div
                    key={book.id}
                    className="my-2 drop-shadow-[0_0_4px_rgba(0,0,0,0.25)] md:h-[100px] p-3 rounded-lg flex flex-col md:flex-row items-center w-full bg-white"
                  >
                    <div className="flex justify-between w-full md:w-auto overflow-hidden">
                      <div className="h-[68px] w-[60px] border border-[#D9D9D9]">
                        <img
                          src={book.fileURL}
                          alt={book.title}
                          className="size-full object-contain"
                        />
                      </div>
                      <div className="md:hidden">
                        <h3 className="text-xl font-medium text-[#203949]">
                          {book?.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <p className="text-[#7C7C7C] text-sm font-normal">
                            {book.rating || "4.0"}
                          </p>
                          <FaStar className="text-[#FFCC68]" />
                        </div>
                      </div>
                    </div>

                    <div className="w-full p-2 flex flex-wrap items-center justify-between">
                      <div className="hidden md:block">
                        <h3 className="text-xl font-medium text-[#203949]">
                          {book.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <p className="text-[#7C7C7C] text-sm font-normal">
                            {book.rating || "4.0"}
                          </p>
                          <FaStar className="text-[#FFCC68]" />
                        </div>
                      </div>
                      <div className="">
                        <h3 className="text-xl font-medium text-[#203949]">
                          Author
                        </h3>
                        <p className="mt-2 text-[#7C7C7C] text-sm font-normal">
                          {book?.author || "Unknown"}
                        </p>
                      </div>
                      <div className="">
                        <h3 className="text-xl font-medium text-[#203949]">
                          Type
                        </h3>
                        <p className="mt-2 text-[#7C7C7C] text-sm font-normal">
                          {book.category || "Ebook"}
                        </p>
                      </div>
                      <div className="">
                        <h3 className="text-xl font-medium text-[#203949]">
                          Price
                        </h3>
                        <p className="mt-2 text-[#7C7C7C] text-sm font-normal">
                          ${book.price}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDelete(book.id)}
                        className="text-red-500 text-xl hover:text-red-700 transition"
                      >
                        <FaTrash />
                      </button>
                      <div>
                        <p className="text-[#7C7C7C] text-sm font-normal">
                          {book.date || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-600">Your cart is empty.</p>
            )}
          </div>

          <div className="w-full md:w-[30%]">
            <div className="rounded-lg bg-white p-3">
              <h4 className="text-center text-[#7C7C7C] text-lg font-bold">
                Order Summary
              </h4>
              <div className="mt-5">
                <div className="flex justify-between items-center">
                  <p className="text-[#7C7C7C] text-lg font-medium">Quantity</p>
                  <p className="text-[#203949] text-lg font-medium">
                    {totalQuantity}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <p className="text-[#7C7C7C] text-lg font-medium">
                    Price/unit
                  </p>
                  <p className="text-[#203949] text-lg font-medium">
                    ${averageUnitPrice}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-3 border-t border-[#EFEFEF] pt-3">
                  <p className="text-[#203949] text-lg font-medium">Total</p>
                  <p className="text-[#203949] text-lg font-medium">
                    ${totalPrice}
                  </p>
                </div>
              </div>
            </div>

            {/* Checkout button */}
            <Link to="/payment-method">
              <Button classNames="cursor-pointer text-white rounded-3xl bg-[#01447E] mt-10 w-full py-3 text-xl font-medium">
                Checkout
              </Button>
            </Link>
          </div>
        </div>

        {/* Recent books section */}
        <section className="my-10">
          <h4 className="text-black text-lg text-center md:text-start font-medium">
            Recent Ebooks
          </h4>
          <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            <BookCard books={approvedEBooks} />
          </div>
        </section>
      </div>
    </>
  );
};

export default React.memo(CartPage);
