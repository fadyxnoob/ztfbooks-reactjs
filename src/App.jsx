// App.jsx - Proper routing setup with Layout
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from './pages/Layout/Layout';
import Home from './pages/Home/Home';
import BookDetail from './pages/BookDetail/BookDetail';
import EBooks from './pages/EBooks/EBooks';
import AudioBooks from './pages/AudioBooks/AudioBooks';
import CartPage from './pages/CartPage/CartPage';
import MyFavourite from './pages/MyFavourite/MyFavourite';
import Faqs from './pages/Faqs/Faqs';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import PhoneVerification from './pages/PhoneVerification/PhoneVerification';
import VerificationSuccess from './pages/VerificationSuccess/VerificationSuccess';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* All routes will be nested under the Layout */}
                    <Route index element={<Home />} />
                    {/* Add more routes here */}
                    <Route path="book-detail" element={<BookDetail />} />
                    <Route path="e-books" element={<EBooks />} />
                    <Route path="audio-books" element={<AudioBooks />} />
                    <Route path="my-cart" element={<CartPage />} />
                    <Route path="my-favourite" element={<MyFavourite />} />
                    <Route path="faqs" element={<Faqs />} />
                    {/* 404 Catch-all route */}
                    <Route path="*" element={<div>404 Not Found</div>} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/phone-verification" element={<PhoneVerification />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;