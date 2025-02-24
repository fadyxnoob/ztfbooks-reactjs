import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsCreditCard } from "react-icons/bs";
import { useParams } from "react-router-dom";
import PreferenceButton from "../../components/PreferenceButton/PreferenceButton";
import Button from "../../components/Button/Button";
import { useSelector } from "react-redux";

const MobilePay = () => {
  const { paymentMethod } = useParams();
  const [selectedPayment, setSelectedPayment] = useState("flutterwve");
  console.log({selectedPayment})
  const cart = useSelector((state) => state.cart);
  const totalPrice =
    cart?.products?.reduce((sum, product) => sum + product.price, 0) || 0;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ✅ Define handlePayment inside the component
  const handlePayment = (data) => {
    // console.log("Processing payment with:", data, "via", selectedPayment);
    // Add API call or payment logic here
  };

  const onSubmit = (data) => {
    // console.log({ data, selectedPayment });
    handlePayment(data); // ✅ No more errors
  };

  return (
    <div className="bg-[#F6F7F8] min-h-screen p-4 md:p-6 lg:p-8">
      <div className="border-b border-[#EBEBEB]">
        <h1 className="text-center mt-8 pb-2 text-2xl sm:text-3xl lg:text-4xl text-[#014471] font-medium">
          Payment Information
        </h1>
      </div>
      <div className="mt-[5rem] w-full md:w-[70%] mx-auto">
        <div className="bg-[#F6F7F8] p-6 md:p-8">
          <div className="bg-[#FFBC06] bg-opacity-40 text-[#333333] w-20 rounded-md p-2 mb-6">
            <span className="text-sm font-medium text-yellow-800">Payment</span>
          </div>
          <p className="text-xl text-[#333333] mb-8 font-bold">
            Add your Voucher Number
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full">
              <PreferenceButton
                icon={
                  <BsCreditCard className="w-8 h-6 sm:w-9 sm:h-7 md:w-10 md:h-8 text-[#014471]" />
                }
                label="Coolpay (CMR)"
                selected={selectedPayment === "coolpay-cmr"}
                onClick={() => setSelectedPayment("coolpay-cmr")}
              />
            </div>

            <div className="w-full">
              <PreferenceButton
                icon={
                  <BsCreditCard className="w-8 h-6 sm:w-9 sm:h-7 md:w-10 md:h-8 text-[#014471]" />
                }
                label="FLUTTERWVE"
                selected={selectedPayment === "flutterwve"}
                onClick={() => setSelectedPayment("flutterwve")}
              />
            </div>

            {/* Submit Button */}
            <Button
            path={`/methods/${paymentMethod}/${selectedPayment}`}
              type="submit"
              classNames="text-center block cursor-pointer w-full bg-[#014471] text-white py-3 px-4 rounded-3xl hover:bg-blue-900 transition-colors"
            >
              ${totalPrice}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MobilePay);
