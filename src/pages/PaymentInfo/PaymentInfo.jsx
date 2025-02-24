import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/Button/Button";
import VisaLogo from "../../assets/images/logos_visa.png";
import MasterCardLogo from "../../assets/images/logos_masterCard.png";
import UnionPayLogo from "../../assets/images/logos_unionPay.png";
import { useSelector } from "react-redux";
import service from "../../API/DBService";
import { useNavigate, useParams } from "react-router-dom";
import VerificationSuccess from "../VerificationSuccess/VerificationSuccess";
import FailedBox from "../../components/FailedBox/FailedBox";
import { removeLocalStorage } from "../../LocalStorage/LocalStorage";

const PaymentForm = () => {
  const { paymentMethod } = useParams();
  const [defaultCurrency, setDefaultCurrency] = useState(null);
  const [boxType, setBoxType] = useState("");
  const [isOpenBox, setIsOpenBox] = useState(false);

  const getCurrency = async () => {
    const response = await service.getDefaultCurrency();
    setDefaultCurrency(response?.code);
  };

  const navigate= useNavigate()
  const authStatus = useSelector((state)=> state.auth.status)
  useEffect(() => {
    if(!authStatus){
      navigate('/login')
    }
    getCurrency();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cardNumber: "",
      expiry: "",
      cvv: "",
      country: "United States",
    },
  });

  const formatCardNumber = (e) => {
    const formatted = e.target.value
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
    setValue("cardNumber", formatted);
  };

  const formatExpiryDate = (e) => {
    const formatted = e.target.value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .slice(0, 5);
    setValue("expiry", formatted);
  };

  const cart = useSelector((state) => state.cart);
  const totalPrice =
    cart?.products?.reduce((sum, product) => sum + product.price, 0) || 0;

  const cartIds = cart?.products?.map((product) => product.id) || [];

  const handlePayment = async (formData) => {
   
    try {
      const paymentData = {
        currencyCode: defaultCurrency,
        totalAmount: totalPrice,  // Ensure this is a valid number
        cartIds: cartIds,         // Use cartIds instead of formData.cartIds
        paymentMethod: paymentMethod || "CARD", // Remove the {} brackets
        integratorPublicId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        metadata: {
          additionalProp1: formData.cardNumber,
          additionalProp2: formData.expiry,
          additionalProp3: formData.cvv,
        },
      };
  
      console.log("Sending Payment Data:", paymentData); // Debugging
  
      const paymentResponse = await service.makeYourPayment(paymentData);
      console.log("Payment Success:", paymentResponse);
  
      setIsOpenBox(true);
      setBoxType("success");
      removeLocalStorage("carts");
    } catch (error) {
      console.error("Payment Failed:", error.response?.data || error.message);
      setIsOpenBox(true);
      setBoxType("failed");
    }
  };
  

  useEffect(() => {
    if (isOpenBox) {
      document.body.style.overflow = "hidden"; 
    } else {
      document.body.style.overflow = "auto";
    }
  
    return () => {
      document.body.style.overflow = "auto"; 
    };
  }, [isOpenBox]); 

  const onSubmit = (data) => {
    const formData = { ...data, cartIds };
    // console.log({formData})
    handlePayment(formData);
  };

  return (
    <>
      {isOpenBox ? (
        boxType === "success" ? (
          <VerificationSuccess
            title="Thank You for Your Purchase!"
            message="Your transaction was successful, and your book is now available in your library."
            buttonText={"Browse More Books"}
            classNames={`fixed bg-white/10 top-16 md:top-0 p-0 md:left-1/4 z-50`}
            pathTo="/"
          />
        ) : (
          <FailedBox pathTo="/my-cart" />
        )
      ) : null}
      <div className="bg-[#F6F7F8] min-h-screen p-4 md:p-6 lg:p-8">
        <div className="border-b border-[#EBEBEB]">
          <h1 className="text-center mt-8 pb-2 text-2xl sm:text-3xl lg:text-4xl text-[#014471] font-medium">
            Payment Information
          </h1>
        </div>
        <div className="mt-[5rem] md:w-[768px] mx-auto">
          <div className="bg-[#F6F7F8] p-6 md:p-8">
            <div className="bg-[#FFBC06] bg-opacity-40 text-[#333333] w-20 rounded-md p-2 mb-6">
              <span className="text-sm font-medium text-yellow-800">
                Payment
              </span>
            </div>

            <p className="text-xl text-[#333333] mb-8 font-bold">
              Add your payment information
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <div>
                  Card Details
                  <div className="relative w-[100%]">
                    <input
                      type="text"
                      {...register("cardNumber", {
                        required: "Card number is required",
                        pattern: {
                          value: /^\d{4} \d{4} \d{4} \d{4}$/,
                          message: "Invalid card number",
                        },
                      })}
                      onChange={formatCardNumber}
                      placeholder="XXXX XXXX XXXX XXXX"
                      maxLength="19"
                      className="bg-[#fff] border-b-[#CCC] border-b-[5px] w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                      <img src={VisaLogo} alt="visa" className="h-4 w-6" />
                      <img
                        src={MasterCardLogo}
                        alt="mastercard"
                        className="h-4 w-6"
                      />
                      <img
                        src={UnionPayLogo}
                        alt="unionpay"
                        className="h-4 w-6"
                      />
                    </div>
                    {errors.cardNumber && (
                      <p className="text-red-500 text-sm">
                        {errors.cardNumber.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="w-40">
                    <input
                      type="text"
                      {...register("expiry", {
                        required: "Expiry date is required",
                        pattern: {
                          value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                          message: "Invalid format (MM/YY)",
                        },
                      })}
                      onChange={formatExpiryDate}
                      placeholder="MM/YY"
                      maxLength="5"
                      className="bg-[#fff] border-b-[#CCC] border-b-[5px] w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.expiry && (
                      <p className="text-red-500 text-sm">
                        {errors.expiry.message}
                      </p>
                    )}
                  </div>
                  <div className="w-40">
                    <input
                      type="text"
                      {...register("cvv", {
                        required: "CVV is required",
                        pattern: { value: /^\d{3,4}$/, message: "Invalid CVV" },
                      })}
                      placeholder="CVV"
                      maxLength="4"
                      className="bg-[#fff] border-b-[#CCC] border-b-[5px] w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.cvv && (
                      <p className="text-red-500 text-sm">
                        {errors.cvv.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <select
                    {...register("country", {
                      required: "Country is required",
                    })}
                    className="bg-white border-none w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                  {errors.country && (
                    <p className="text-red-500 text-sm">
                      {errors.country.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  classNames="cursor-pointer w-full bg-blue-800 text-white py-3 px-4 rounded-3xl hover:bg-blue-900 transition-colors"
                >
                  ${totalPrice}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(PaymentForm);
