import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import service from "../API/DBService";

const stripePromise = loadStripe("pk_test_51LletxBhW6Yoi4csLuVpCLJ2b6WhJ6HnCdnIZ8PkLHIfPeWCPJSkShHSWuGxZCDblkDZmH6QCZbCgvXfzQvNvOG900PaOid8ym");

const CheckoutForm = ({ btnText, btnClasses }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/payment-success",
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button className={btnClasses} type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : btnText}
      </button>
      {errorMessage && <div style={{ color: "red", marginTop: "10px" }}>{errorMessage}</div>}
    </form>
  );
};

const StripePayment = ({ btnText, btnClasses, cartItems }) => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const getPaymentIntent = async () => {
      try {
        const response = await service.createPaymentIntent({ cartItems });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    };

    getPaymentIntent();
  }, [cartItems]);

  if (!clientSecret) return <p>Loading payment details...</p>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm btnText={btnText} btnClasses={btnClasses} />
    </Elements>
  );
};

export default StripePayment;
