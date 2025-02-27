import React, { useEffect, useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const cart = useSelector((state) => state.cart);
  const totalPrice = cart?.products?.reduce((sum, product) => sum + product.price, 0) || 0;

  useEffect(() => {
    if (!authStatus) {
      navigate("/login");
    }
  }, [authStatus, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin + "/" },
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setMessage("Payment successful!");
      navigate("/");
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Secure Payment</h2>
      <PaymentElement />
      <Button type="submit" disabled={!stripe || isLoading} classNames="w-full bg-blue-600 text-white py-3 mt-4">
        {isLoading ? "Processing..." : `Pay $${totalPrice}`}
      </Button>
      {message && <p className="text-red-500 text-center mt-2">{message}</p>}
    </form>
  );
};

export default CheckoutForm;
