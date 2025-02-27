import React, { useEffect, useState } from "react";
import { FaStar, FaTrash } from "react-icons/fa";
import Button from "../../components/Button/Button";
import BookCard from "../../components/BookCard/BookCard";
import { useSelector, useDispatch } from "react-redux";
import service from "../../API/DBService";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { doACheckout } from "../../Store/checkoutSlice";
import { removeFromCart } from "../../Store/cartSlice";
import Alert from "../../components/Alert/Alert";
import {
  getLocalStorage,
  setLocalStorage,
} from "../../LocalStorage/LocalStorage";
import axios from "axios";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const apiKey = import.meta.env.VITE_GET_APPROVED_BOOKS_API_KEY;
  const [approvedEBooks, setApprovedEBooks] = useState([]);
  const [cartBooks, setCartBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const products = useSelector((state) => state.cart.products) || [];
  const [cartProducts, setCartProducts] = useState([]);
  const totalPrice = cartProducts.reduce(
    (acc, product) => acc + (product?.ebook?.amount || 0),
    0
  );

  const totalQuantity = cartProducts.length;
  const averageUnitPrice =
    totalQuantity > 0 ? (totalPrice / totalQuantity).toFixed(2) : 0;

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = getLocalStorage("userdata")?.jwtToken;
      if (!token) return;
      try {
        const response = await axios.get(
          "https://server.ztfbooks.com/client/v1/cart",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCartProducts(response.data);
        setLocalStorage("carts", response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCartItems();
  }, [products]);

  // Fetch book details
  useEffect(() => {
    const fetchBookDetails = async () => {
      if (!cartProducts || cartProducts.length === 0) return;
      const updatedBooks = await Promise.all(
        cartProducts.map(async (book) => {
          try {
            const bookRes = await service.getBookByID(book?.ebook.id);
            if (!bookRes.data) {
              console.error("Invalid book response:", bookRes);
              return null;
            }
            const file = bookRes.data.thumbnailFileName;
            const fileURL = await service.getFileByName(file);

            return {
              ...book,
              fileURL,
              category: bookRes.data.categories?.[0]?.name || "Unknown",
              author: bookRes.data.author?.name || "Unknown",
              date: bookRes.data.publishDate || "N/A",
              id: bookRes.data.id,
              cartID: book.id, // Keep this for removing items
              title: bookRes.data.ebookTitle,
              price: bookRes.data.amount,
              rating: bookRes.data.rating
            };
          } catch (err) {
            console.error(`Failed to fetch book ${book.ebookId}:`, err);
            return null;
          }
        })
      );

      // ✅ Only update if books are valid
      setCartBooks(updatedBooks.filter((book) => book !== null));
    };

    if (products.length > 0) {
      setTimeout(fetchBookDetails, 500); // Small delay to allow Redux update
    }
  }, [cartProducts]);

  const handleCheckout = () => {
    dispatch(
      doACheckout({
        totalAmount: totalPrice,
        cartIds: products.map((p) => p?.ebook?.id),
      })
    );
    navigate("/payment-method");
  };

  // Function to show alert
  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 2000); // Hide after 2 seconds
  };

  const handleRemoveFromCart = async (cartId) => {
    if (!cartId) return showAlert("error", "Invalid cart item!");
    setCartBooks((prev) => prev.filter((book) => book.cartID !== cartId));
    const result = await dispatch(removeFromCart(cartId));
    if (removeFromCart.fulfilled.match(result))
      showAlert("success", "Item removed successfully!");
    else showAlert("error", "Failed to remove item.");
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await service.getApprovedBooks(apiKey);
        if (res.content) setApprovedEBooks(res.content);
      } catch (err) {
        console.error("Failed to fetch approved books:", err);
      }
    })();
  }, []);

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
                          {book?.title.split(' ').slice(0, 5).join(' ')}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <p className="text-[#7C7C7C] text-sm font-normal">
                            {book.rating}
                          </p>
                          <FaStar className="text-[#FFCC68]" />
                        </div>
                      </div>
                    </div>

                    <div className="w-full p-2 flex flex-wrap items-center justify-between">
                      <div className="hidden md:block">
                        <h3 className="text-xl font-medium text-[#203949]">
                          {book.title.split(' ').slice(0, 5).join(' ')}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <p className="text-[#7C7C7C] text-sm font-normal">
                            {book.rating}
                          </p>
                          <FaStar className="text-[#FFCC68]" />
                        </div>
                      </div>
                      <div className="">
                        <h3 className="text-xl font-medium text-[#203949]">
                          Author
                        </h3>
                        <p className="mt-2 text-[#7C7C7C] text-sm font-normal">
                          {book?.author}
                        </p>
                      </div>
                      <div className="">
                        <h3 className="text-xl font-medium text-[#203949]">
                          Type
                        </h3>
                        <p className="mt-2 text-[#7C7C7C] text-sm font-normal">
                          {book?.category}
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
                        onClick={() => handleRemoveFromCart(book.cartID)}
                        className="text-red-500 text-xl hover:text-red-700 transition"
                      >
                        <FaTrash />
                      </button>
                      <div>
                        <p className="text-[#7C7C7C] text-sm font-normal">
                          {book.date}
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
            <Button
              onClick={handleCheckout}
              classNames="cursor-pointer text-white rounded-3xl bg-[#01447E] mt-10 w-full py-3 text-xl font-medium"
              disabled={cartProducts.length === 0}
            >
              Checkout
            </Button>
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
