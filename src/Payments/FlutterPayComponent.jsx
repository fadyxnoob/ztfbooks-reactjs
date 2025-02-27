import React, { useEffect, useState } from "react";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import service from "../API/DBService";
import authService from "../API/authService";
import { useSelector } from "react-redux";

const FlutterPayComponent = ({ className, currency, options, btnText }) => {
  const [publicApi, setPublicApi] = useState("");
  const [logo, setLogo] = useState("");
  const [clientDetails, setClientDetails] = useState({
    email: "",
    phone: "",
    name: "",
    image: "",
  });

  const products = useSelector((state) => state?.cart?.products || []);
  const totalPrice = products.reduce(
    (acc, product) => acc + (product?.ebook?.amount || 0),
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
    const imageUrl = await service.getFileByName(response?.image);
    setClientDetails({
      email: response?.user?.email,
      phone: response?.contactDetails?.phoneNumber,
      name: response?.user?.name,
      image: imageUrl,
    });
  };

  const getSiteLogo = async () => {
    const logoURL = await service.getLogo();
    setLogo(logoURL);
  };

  useEffect(() => {
    getFlutterWaveData();
    getClientDetails();
    getSiteLogo();
  }, []);

  const config = {
    public_key: publicApi,
    tx_ref: Date.now(),
    amount: totalPrice,
    currency: currency,
    payment_options:`${options}, ussd`,

    customer: {
      email: clientDetails?.email,
      phone_number: clientDetails?.phone,
      name: clientDetails?.name,
    },
    customizations: {
      title: "My books",
      description: "Payment for items in cart",
      logo: '/ztf-log.png',
    },
  };

  const fwConfig = {
    ...config,
    text: `${btnText}`,
    callback: (response) => {
      console.log(response);
      closePaymentModal(); 
    },
    onClose: () => {},
  };

  return (
    <div className="App">
      <FlutterWaveButton {...fwConfig} className={className} />
    </div>
  );
};

export default FlutterPayComponent;
