import React, { useEffect, useState } from "react";
import { BsCreditCard } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import PreferenceButton from "../../components/PreferenceButton/PreferenceButton";
import { useSelector } from "react-redux";
import FlutterPayComponent from "../../Payments/FlutterPayComponent";
import service from "../../API/DBService";
import PaystackCheckout from "../../Payments/PaystackCheckout";

const CardMethods = () => {
  const navigate = useNavigate();
  const { paymentMethod } = useParams();
  const [selectedPayment, setSelectedPayment] = useState("paystack");
  const [dollarCurrency, setDollarCurrency] = useState('')
  useEffect(() => {
    const getCurrencyByID = async () => {
      const response = await service.getCurrencyByID(6)
      // console.log({response})
      setDollarCurrency(response.rateToDefault)
    }
    getCurrencyByID()
  }, [])

  const products = useSelector((state) => state?.cart?.products || []);
  const totalPrice = products.reduce(
    (acc, product) => acc + (product?.ebook?.amount || 0),
    0
  );
  const handleStripePayment = () => {
    navigate("/stripe-payment", { state: { amount: totalPrice } }); // 🔄 Redirects to StripePayment page
  };

  return (
    <div className="bg-[#F6F7F8] min-h-screen p-4 md:p-6 lg:p-8">
      <h1 className="text-center mt-8 text-2xl sm:text-3xl text-[#014471] font-medium">
        Payment Information
      </h1>

      <div className="mt-[5rem] w-full md:w-[70%] mx-auto">
        <div className="bg-[#F6F7F8] p-6 md:p-8">
          <p className="text-xl text-[#333333] mb-8 font-bold">
            Select your payment method
          </p>

          {/* Stripe Button */}
          <div className="w-full hidden">
            <PreferenceButton
              icon={<BsCreditCard className="w-8 h-6 text-[#014471]" />}
              label="STRIPE"
              selected={selectedPayment === "stripe"}
              onClick={() => setSelectedPayment("stripe")}
              disabled
            />
          </div>

          {/* Paystack Button */}
          <div className="w-full">
            <PreferenceButton
              icon={<BsCreditCard className="w-8 h-6 text-[#014471]" />}
              label="PAYSTACK"
              selected={selectedPayment === "paystack"}
              onClick={() => setSelectedPayment("paystack")}
            />
          </div>
          {/* Flutterwave Button */}
          <div className="w-full">
            <PreferenceButton
              icon={<BsCreditCard className="w-8 h-6 text-[#014471]" />}
              label="FLUTTERWAVE"
              selected={selectedPayment === "flutterwave"}
              onClick={() => setSelectedPayment("flutterwave")}
            />
          </div>

          {/* Payment Button */}
          {selectedPayment === "flutterwave" ? (
            <FlutterPayComponent
              btnText={`Pay $${totalPrice * dollarCurrency}`}
              className="block w-full bg-[#014471] text-white py-3 px-4 rounded-3xl hover:bg-blue-900 cursor-pointer"
            />
          ) : selectedPayment === "paystack" ? (
            <PaystackCheckout
              btnText={`Pay $${totalPrice * dollarCurrency}`}
              className="block w-full bg-[#014471] text-white py-3 px-4 rounded-3xl hover:bg-blue-900 cursor-pointer"
            />
          ) : (
            <button
              onClick={handleStripePayment} // ✅ Redirects to Stripe page
              className="block w-full bg-[#014471] text-white py-3 px-4 rounded-3xl hover:bg-blue-900 cursor-pointer"
            >
              Pay with Stripe
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(CardMethods);
