import React, { useEffect, useState } from "react";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import service from "../API/DBService";
import authService from "../API/authService";
import { useSelector } from "react-redux";
import axios from "axios";

const FlutterPayComponent = ({ className, btnText }) => {
  const [publicApi, setPublicApi] = useState("");
  const [currency, setCurrency] = useState("USD"); // Default fallback
  const [paymentOptions, setPaymentOptions] = useState(["card"]); // Default payment method
  const [clientDetails, setClientDetails] = useState({
    email: "",
    phone: "",
    name: "",
  });

  const products = useSelector((state) => state?.cart?.products || []);
  const totalPrice = products.reduce(
    (acc, product) => acc + (product?.ebook?.amount || 0),
    0
  );

  // Fetch all supported countries and their payment methods dynamically
  const getSupportedCountries = async () => {
    try {
      const { data: countryList } = await axios.get(
        "https://server.ztfbooks.com/opn/v1/countries/all"
      );

      const paymentMethods = {};
      const currencyMapping = {};

      countryList.forEach((country) => {
        paymentMethods[country.code] = country.payment_methods || ["card"];
        currencyMapping[country.code] = country.currency || "USD"; // Default to USD if no currency found
      });

      return { paymentMethods, currencyMapping };
    } catch (error) {
      console.error("Error fetching supported countries:", error);
      return { paymentMethods: {}, currencyMapping: {} };
    }
  };

  // Fetch User's Country & Match with Available Payment Methods and Currency
  const getUserLocation = async (paymentMethods, currencyMapping) => {
    try {
      const res = await axios.get("https://ipapi.co/json/");
      const countryCode = res.data.country_code.toUpperCase(); // Example: "NG"
      const userCurrency = res.data.currency || "USD";

      if (paymentMethods[countryCode]) {
        setPaymentOptions(paymentMethods[countryCode]);
      } else {
        setPaymentOptions(["card"]); // Default fallback
      }

      setCurrency(currencyMapping[countryCode] || userCurrency); // Set correct currency
    } catch (error) {
      console.error("Error fetching user location:", error);
      setCurrency("USD"); // Default fallback
      setPaymentOptions(["card"]);
    }
  };

  useEffect(() => {
    const initPaymentOptions = async () => {
      const { paymentMethods, currencyMapping } = await getSupportedCountries();
      await getUserLocation(paymentMethods, currencyMapping);
    };

    getFlutterWaveData();
    getClientDetails();
    initPaymentOptions();
  }, []);

  const getFlutterWaveData = async () => {
    const res = await service.getFlutterwaveCredentials();
    if (res?.publicKey) {
      setPublicApi(res.publicKey);
    }
  };

  const getClientDetails = async () => {
    const response = await authService.getCurrentLoggedIn();
    setClientDetails({
      email: response?.user?.email,
      phone: response?.contactDetails?.phoneNumber,
      name: response?.user?.name,
    });
  };

  const config = {
    public_key: publicApi,
    tx_ref: `TX-${Date.now()}`,
    amount: totalPrice,
    currency: currency, // ✅ Now fully dynamic
    payment_options: paymentOptions.join(", "), // ✅ Fully dynamic
    customer: {
      email: clientDetails?.email,
      phone_number: clientDetails?.phone,
      name: clientDetails?.name,
    },
    customizations: {
      title: "My Books",
      description: "Payment for items in cart",
      logo: "/ztf-log.png",
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
