import React, { useState, useEffect } from "react";
import PreferenceButton from "../../components/PreferenceButton/PreferenceButton";
import { BsCreditCard } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import Button from "../../components/Button/Button";
import { LuSmartphone } from "react-icons/lu";
import { FaPaypal } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const PaymentInformation = () => {
  const [selectedPayment, setSelectedPayment] = useState('card');
  const navigate= useNavigate()
  const authStatus = useSelector((state)=> state.auth.status)
  useEffect(() => {
    if(!authStatus){
      navigate('/login')
    }
  }, []);
  return (
    <div className="min-h-screen px-5 md:px-[80px] bg-[#F6F7F8] md:pb-[8rem]">
      <div className="px-2 md:px-[32px] pt-4 w-[100%]">
        <div className="border-b border-[#EBEBEB]">
          <h1 className="mt-8 pb-2 text-2xl sm:text-3xl lg:text-4xl text-[#014471] font-medium">
            Payment Information
          </h1>
        </div>
        <p className="text-[#000000] text-[1rem] mb-8 mt-12">
          Choose your payment option
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-8 mb-6">
        <div className="w-[100%]">
          <PreferenceButton
            icon={
              <BsCreditCard className="w-8 h-6 sm:w-9 sm:h-7 md:w-10 md:h-8 text-[#014471]" />
            }
            label="Card Payment"
            selected={selectedPayment === "card"}
            onClick={() => setSelectedPayment("card")}
            
          />
        </div>
        <div className="w-[100%]">
          <PreferenceButton
            icon={
              <FaPaypal className="w-8 h-6 sm:w-9 sm:h-7 md:w-10 md:h-8 text-[#014471]" />
            }
            label="Voucher"
            selected={selectedPayment === "voucher"}
            onClick={() => setSelectedPayment("voucher")}
            disabled
            className='cursor-not-allowed'
          />
        </div>
        <div className="w-[100%]">
          <PreferenceButton
            icon={
              <LuSmartphone className="w-8 h-6 sm:w-9 sm:h-7 md:w-10 md:h-8 text-[#014471]" />
            }
            label="Local Mobile Pay"
            selected={selectedPayment === "mobile"}
            onClick={() => setSelectedPayment("mobile")}
            disabled
          />
        </div>
        <div className="w-[100%]">
          <PreferenceButton
            icon={
              <FaPlus className="w-8 h-6 sm:w-9 sm:h-7 md:w-10 md:h-8 text-[#014471]" />
            }
            label="Add a Payment Method"
            selected={selectedPayment === "add"}
            onClick={() => setSelectedPayment("add")}
            disabled
          />
        </div>
      </div>
      <div className="w-[100%]">
        <div className="w-full sm:w-[60%] md:w-[20%] mx-auto">
          <Link 
            to={`/checkout/${selectedPayment}`}
          >
          <Button
            classNames={
              "cursor-pointer mt-8 sm:mt-12 md:mt-[4rem] w-full bg-[#000000] text-[#ffffff] py-3 sm:py-3 px-3 sm:px-4 rounded-2xl hover:bg-blue-900 transition-colors"
            }
          >
            Continue
          </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentInformation;
