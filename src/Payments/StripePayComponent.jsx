import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import service from "../API/DBService";
import CheckoutForm from "./CheckoutForm";

const StripePayPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { amount } = location.state || {}; 
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const fetchStripeData = async () => {
      try {
        const res = await service.getStripeCredentials();
        if (!res.apiKey) {
          console.error("Publishable key missing");
          return;
        }
        setStripePromise(await loadStripe(res.apiKey));

        // Create PaymentIntent and get clientSecret
        const paymentIntent = await service.getStripeCredentials();
        // console.log({paymentIntent})
        if (paymentIntent.secretKey) {
          setClientSecret(paymentIntent.secretKey);
        } else {
          console.error("Failed to get clientSecret from backend");
        }
      } catch (error) {
        console.error("Error fetching Stripe data:", error);
      }
    };

    fetchStripeData();
  }, [amount]);

  if (!stripePromise || !clientSecret) return <p>Loading Stripe...</p>;

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Stripe Payment</h2>
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Cancel Payment
        </button>
      </div>
    </div>
  );
};

export default StripePayPage;
