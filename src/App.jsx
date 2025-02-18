import React, { Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Loader from "./components/Loader/Loader.jsx";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";
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
            <Route path="e-books" element={<EBooks />} />
            <Route path="audio-books" element={<AudioBooks />} />
            <Route path="my-cart" element={<CartPage />} />
            <Route path="my-favourite" element={<MyFavourite />} />
            <Route path="myProfile" element={<AccountInfo />} />
            <Route path="faqs" element={<Faqs />} />
            <Route path="about-us" element={<About />} />
            {/* 404 Catch-all route */}
            <Route path="*" element={<div>404 Not Found</div>} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/phone-verification" element={<PhoneVerification />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
