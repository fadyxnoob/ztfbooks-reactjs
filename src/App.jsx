import React, { Suspense, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Loader from "./components/Loader/Loader.jsx";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";
import ChooseByMobilePay from "./pages/ChooseByMobilePay/ChooseByMobilePay.jsx";
import TelephonePay from "./pages/TelephonePay/TelephonePay.jsx";
import Methods from "./components/Methods/Methods.jsx";
import StripePayPage from "./Payments/StripePayComponent.jsx";
import CheckRoute from "./components/CheckRoute/CheckRoute.jsx";


// Lazy loading components
const Home = React.lazy(() => import("./pages/Home/Home"));
const BookDetail = React.lazy(() => import("./pages/BookDetail/BookDetail"));
const EBooks = React.lazy(() => import("./pages/EBooks/EBooks"));
const AudioBooks = React.lazy(() => import("./pages/AudioBooks/AudioBooks"));
const CartPage = React.lazy(() => import("./pages/CartPage/CartPage"));
const MyFavourite = React.lazy(() => import("./pages/MyFavourite/MyFavourite"));
const Faqs = React.lazy(() => import("./pages/Faqs/Faqs"));
const Login = React.lazy(() => import("./pages/Login/Login"));
const Signup = React.lazy(() => import("./pages/Signup/Signup"));
const AuthorPage = React.lazy(() => import("./pages/AuthorPage/AuthorPage.jsx"));
const ForgotPassword = React.lazy(() =>
  import("./pages/ForgotPassword/ForgotPassword")
);
const PhoneVerification = React.lazy(() =>
  import("./pages/PhoneVerification/PhoneVerification")
);
const VerificationSuccess = React.lazy(() =>
  import("./pages/VerificationSuccess/VerificationSuccess")
);
const AccountInfo = React.lazy(() =>
  import("./components/AccountInfo/AccountInfo")
);
const SearchPage = React.lazy(() => import("./pages/SearchPage/SearchPage"));
const About = React.lazy(() => import("./pages/About/About"));
const PaymentInformation = React.lazy(() =>
  import("./pages/PaymentInformation/PaymentInformation.jsx")
);
const PaymentInfo = React.lazy(() =>
  import("./pages/PaymentInfo/PaymentInfo.jsx")
);
const RecommendedBooks = React.lazy(() =>
  import("./pages/RecommendedBooks/RecommendedBooks.jsx")
);
const RecentBooks = React.lazy(() =>
  import("./pages/RecentBooks/RecentBooks.jsx")
);
const BestSellingBooks = React.lazy(() =>
  import("./pages/BestSellingBooks/BestSellingBooks.jsx")
);
const SpecialDiscount = React.lazy(() =>
  import("./pages/SpecialDiscount/SpecialDiscount.jsx")
);

const SeriesPage = React.lazy(() =>
  import("./pages/SeriesPage/SeriesPage.jsx")
);
const SingleSeriesPage = React.lazy(() =>
  import("./pages/SeriesPage/SingleSeriesPage.jsx")
);


const App = () => {
  return (
    <BrowserRouter>
      {/* Self-closing ScrollToTop component */}
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* All routes nested under Layout */}

            <Route index element={<Home />} />

            <Route path="/search" element={<SearchPage />} />
            <Route path="book-detail/:bookID" element={<BookDetail />} />
            <Route path="author/:authorID" element={<AuthorPage />} />
            <Route path="e-books" element={<EBooks />} />
            <Route path="recommended-books" element={<RecommendedBooks />} />
            <Route path="best-selling-books" element={<BestSellingBooks />} />
            <Route path="recent-books" element={<RecentBooks />} />
            <Route
              path="special-discount-books"
              element={<SpecialDiscount />}
            />
            <Route path="audio-books" element={<AudioBooks />} />
            <Route
              path="my-cart"
              element={
                <CheckRoute>
                  <CartPage />
                </CheckRoute>
              }
            />
            <Route path="my-favourite" element={<MyFavourite />} />
            <Route
              path="myProfile"
              element={
                <CheckRoute>
                  <AccountInfo />
                </CheckRoute>
              }
            />
            <Route path="faqs" element={<Faqs />} />
            <Route path="about-us" element={<About />} />
            <Route
              path="payment-method"
              element={
                <CheckRoute>
                  <PaymentInformation />
                </CheckRoute>
              }
            />
            <Route
              path="stripe-payment"
              element={
                <CheckRoute>
                  <StripePayPage />
                </CheckRoute>
              }
            />
            <Route
              path="methods/:paymentMethod"
              element={
                <CheckRoute>
                  <Methods />
                </CheckRoute>
              }
            />
            <Route
              path="series"
              element={
                <SeriesPage />
              }
            />
            <Route
              path="series/:seriesName"
              element={
                <SingleSeriesPage />
              }
            />
            <Route
             path="/series/:seriesName/book/:bookID"
              element={
                <BookDetail />
              }
            />
            <Route
              path="methods/:paymentMethod/:mobileMethod"
              element={
                <CheckRoute>
                  <ChooseByMobilePay />
                </CheckRoute>
              }
            />
            <Route
              path="methods/:paymentMethod/:mobileMethod/:other"
              element={
                <CheckRoute>
                  <TelephonePay />
                </CheckRoute>
              }
            />
            {/* 404 Catch-all route */}
            <Route path="*" element={<div>404 Not Found</div>} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/phone-verification" element={<PhoneVerification />} />
          <Route path="/success-card" element={<VerificationSuccess />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
