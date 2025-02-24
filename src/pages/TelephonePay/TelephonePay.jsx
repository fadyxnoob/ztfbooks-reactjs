import React, { useState } from "react";
import ZTFLogo from "../../assets/images/ztf-logo.png";
import { FaCircleInfo } from "react-icons/fa6";
import Union from "../../assets/images/logos_unionPay.png";
import BiometricMasterCard from "../../assets/images/mastercard-biometric.png";
import MTNMasterCard from "../../assets/images/MTN-and-Mastercard 1.png";
import infinity from "../../assets/images/infinity.png";
import Button from "../../components/Button/Button";
import { useParams } from "react-router-dom";

const TelephonePay = () => {
  const {otherPayment} = useParams()
  const [selectedPayment, setSelectedPayment] = useState("");

  return (
    <div className="md:w-[80%] mx-auto my-20">
      <div className="md:w-1/2 p-5 md:p-0 mx-auto">
        <div className="size-[125px] mx-auto">
          <img src={ZTFLogo} alt="ZTF Logo" />
        </div>
        <div className="mt-5">
          <h2 className="text-[#203949] font-medium text-3xl text-center">
            ZTFBOOKS ONLINE
          </h2>
          <div className="mt-10 text-center">
            <div className="text-[#203949] font-medium text-3xl flex items-center justify-between border-t border-[#C8C1C1] py-3">
              <p>Operation</p>
              <p>Achat en Ligne</p>
            </div>
            <div className="text-[#203949] font-normal text-3xl flex items-center justify-between border-t border-[#C8C1C1] py-3">
              <p>Montant</p>
              <p>796 FCFA</p>
            </div>
            <div className="text-[#203949] font-normal text-3xl flex items-center justify-between border-t border-[#C8C1C1] py-3">
              <p>Frais</p>
              <p>8 FCFA</p>
            </div>
            <div className="text-[#203949] font-normal text-3xl flex items-center justify-between border-y border-[#C8C1C1] py-3">
              <p>Net à payer</p>
              <p className="text-[#01447E] font-medium">804 FCFA</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 md:p-0">
        {/* Information Box */}
        <div className="bg-[#D9D9D9] py-2 px-2 md:py-10 md:ps-14 md:w-[70%] mt-5 flex items-center justify-center gap-5 md:ms-16">
          <div>
            <FaCircleInfo className="text-gray-600" />
          </div>
          <p className="text-xl md:text-2xl font-normal text-gray-600">
            Veuillez sélectionner un mode de <br />
            paiement ci-dessous.
          </p>
        </div>
        <form>
          {/* Payment Options */}
          <div className="mt-6 md:w-[50%] mx-auto">
            <label
              className="text-base font-normal text-[#333333]"
              htmlFor="telpay"
            >
              Votre numero de telephone
            </label>{" "}
            <br />
            <input
              className="w-full bg-white rounded-lg text-gray-600 py-2 mt-2 px-10 drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] border-0 outline-0"
              type="text"
              id="telpay"
              placeholder="145678068678"
            />
          </div>

          <div className="border-b border-[#C8C1C1] md:w-[50%] md:ms-[25%] mt-10 flex flex-col md:flex-row items-center justify-center gap-5 md:gap-10 pb-10">
            <Button classNames="cursor-pointer text-[#333333] text-base font-normal border-[1px] border-[#7C7C7C] py-3 px-16 rounded">
              Annuler
            </Button>
            <Button classNames="cursor-pointer text-white bg-[#1D2C41] text-base font-normal border-[1px] border-[#7C7C7C] py-3 px-16 rounded">
              Annuler
            </Button>
          </div>
        </form>
        <p className="text-[#333333] font-light text-base mt-5 text-center">
          My Cool Payent Gateway @2020
        </p>
      </div>
    </div>
  );
};

export default React.memo(TelephonePay);
