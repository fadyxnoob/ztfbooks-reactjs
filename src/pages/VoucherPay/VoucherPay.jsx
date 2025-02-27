import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/Button/Button";
import { useSelector } from "react-redux";
import service from "../../API/DBService";
import { useNavigate, useParams } from "react-router-dom";
import VerificationSuccess from "../VerificationSuccess/VerificationSuccess";
import FailedBox from "../../components/FailedBox/FailedBox";
import { removeLocalStorage } from "../../LocalStorage/LocalStorage";

const VoucherPay = () => {
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

  
    const cart = useSelector((state) => state.cart);
    const totalPrice =
      cart?.products?.reduce((sum, product) => sum + product.price, 0) || 0;
  
    const cartIds = cart?.products?.map((product) => product.id) || [];
  
    const handlePayment = async (formData) => {
      try {
        const paymentData = {
          currencyCode: "USD",
          totalAmount: totalPrice,
          cartIds: formData.cartIds,
          paymentMethod: "VOUCHER",
          integratorPublicId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          metadata: {
            VOUCHER_NUMBER: formData.voucherNumber,
          },
        };
  
        const paymentResponse = await service.initiatePayment(paymentData);
        console.log("Payment Success:", paymentResponse);
        setIsOpenBox(true);
        setBoxType("success");
        removeLocalStorage('carts')
      } catch (error) {
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
              Add your Voucher Number
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <div>
                  <div className="relative w-[100%]">
                    <input
                    value={'VAE266757'}
                      type="text"
                      {...register("voucherNumber", {
                        required: "Voucher number is required",
                      })}
                      onChange={(e)=> e.target.value}
                      placeholder="VAE266757"
                      maxLength="19"
                      className="bg-[#fff] border-b-[#CCC] border-b-[5px] w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                   
                    {errors.voucherNumber && (
                      <p className="text-red-500 text-sm">
                        {errors.voucherNumber.message}
                      </p>
                    )}
                  </div>
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

export default React.memo(VoucherPay);
