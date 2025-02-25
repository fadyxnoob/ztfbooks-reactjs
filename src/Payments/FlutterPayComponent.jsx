import React, { useEffect, useState } from "react";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import service from "../API/DBService";
import authService from "../API/authService";
import { useSelector } from "react-redux";

const FlutterPayComponent = () => {
  const [publicApi, setPublicApi] = useState("");
  const [clientDetails, setClientDetails] = useState({
    email: "",
    phone: "",
    name: "",
    image:''
  });
  const products = useSelector((state) => state?.cart?.products || []);
  const totalPrice = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  const getFlutterWaveData = async () => {
    const res = await service.getFlutterwaveCredentials();
    if (res && res?.publicKey) {
      setPublicApi(res?.publicKey);
    }
  };

  // get clint dets
  const getClientDetails = async () => {
    const response = await authService.getCurrentLoggedIn();
    console.log(response?.image)
    const imageUrl = await service.getFileByName(response?.image)
    setClientDetails({
      email:response?.user?.email,
      phone:response?.contactDetails?.phoneNumber,
      name:response?.user?.name,
      image:imageUrl
    });
  };

  useEffect(() => {
    getFlutterWaveData();
    getClientDetails();
  }, []);
  const config = {
    public_key: publicApi,
    tx_ref: Date.now(),
    amount: totalPrice,
    currency: "USD",
    payment_options: "card,mobilemoney,ussd",

    customer: {
      email: clientDetails?.email,
      phone_number: clientDetails?.phone,
      name: clientDetails?.name,
    },
    customizations: {
      title: "My books",
      description: "Payment for items in cart",
      logo: clientDetails.image ||"https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const fwConfig = {
    ...config,
    text: `Pay $${totalPrice}`,
    callback: (response) => {
      console.log(response);
      closePaymentModal(); // this will close the modal programmatically
    },
    onClose: () => {},
  };

  return (
    <div className="App">
      <FlutterWaveButton
        {...fwConfig}
        className="cursor-pointer text-white bg-[#1D2C41] text-base font-normal border-[1px] border-[#7C7C7C] py-3 px-16 rounded"
      />
    </div>
  );
};

export default FlutterPayComponent;
