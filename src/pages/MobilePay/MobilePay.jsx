import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsCreditCard } from "react-icons/bs";
import { useParams } from "react-router-dom";
import PreferenceButton from "../../components/PreferenceButton/PreferenceButton";
import Button from "../../components/Button/Button";
import { useSelector } from "react-redux";
import FlutterPayComponent from "../../Payments/FlutterPayComponent";

const MobilePay = () => {
  const { paymentMethod } = useParams();
  const [selectedPayment, setSelectedPayment] = useState("flutterwave");
  const products = useSelector((state) => state?.cart?.products || []);
  const totalPrice = products.reduce(
    (acc, product) => acc + (product?.ebook?.amount || 0),
    0
  );
    
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlePayment = (data) => {};

  const onSubmit = (data) => {
    handlePayment(data);
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
            Add your mobile payment
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full hidden">
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
                selected={selectedPayment === "flutterwave"}
                onClick={() => setSelectedPayment("flutterwave")}
              />
            </div>

            {selectedPayment === "flutterwave" ? (
              <FlutterPayComponent currency={'GHS'} options={'mobilemoney'}
              btnText={`Pay $${totalPrice}`} className='text-center block cursor-pointer w-full bg-[#014471] text-white py-3 px-4 rounded-3xl hover:bg-blue-900 transition-colors'/>
            ) : (
              <Button
                path={`/methods/${paymentMethod}/${selectedPayment}`}
                type="submit"
                classNames="text-center block cursor-pointer w-full bg-[#014471] text-white py-3 px-4 rounded-3xl hover:bg-blue-900 transition-colors"
              >
                Pay ${totalPrice}
              </Button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MobilePay);
