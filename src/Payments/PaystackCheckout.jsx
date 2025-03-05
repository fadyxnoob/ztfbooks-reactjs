import React, { useState, useEffect } from "react";
import { getPayStackCredentials } from "../API/checkoutMethods";
import { useSelector } from "react-redux";
import authService from "../API/authService";

const PaystackCheckout = ({ btnText, className }) => {
    const [publicKey, setPublicKey] = useState("");
    const [loading, setLoading] = useState(true); // Track loader state
    const products = useSelector((state) => state?.cart?.products || []);
    const totalPrice = products.reduce(
        (acc, product) => acc + (product?.ebook?.amount || 0),
        0
    );

    const [clientDetails, setClientDetails] = useState({
        email: "",
        phone: "",
        name: "",
    });

    // Fetch Paystack Public Key
    useEffect(() => {
        const fetchCredentials = async () => {
            try {
                const res = await getPayStackCredentials();
                if (res?.publicKey) {
                    setPublicKey(res.publicKey);
                    console.log("🚀 Public Key Fetched:", res.publicKey);
                } else {
                    console.error("❌ Error: Paystack public key is missing");
                }
            } catch (error) {
                console.error("❌ Error fetching Paystack credentials:", error);
            } finally {
                setLoading(false); // Hide loader
            }
        };
        fetchCredentials();
    }, []);

    // Fetch User Details
    useEffect(() => {
        const getClientDetails = async () => {
            try {
                const response = await authService.getCurrentLoggedIn();
                setClientDetails({
                    email: response?.user?.email || "",
                    phone: response?.contactDetails?.phoneNumber || "",
                    name: response?.user?.name || "",
                });
            } catch (error) {
                console.error("❌ Error fetching client details:", error);
            }
        };
        getClientDetails();
    }, []);

    // Load Paystack Script Dynamically
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://js.paystack.co/v1/inline.js";
        script.async = true;
        script.onload = () => console.log("✅ Paystack script loaded");
        document.body.appendChild(script);
    }, []);

    const initializePayment = () => {
        if (!window.PaystackPop) {
            console.error("❌ Paystack script not loaded!");
            return;
        }
    
        const handler = window.PaystackPop.setup({
            key: publicKey,
            email: clientDetails.email,
            amount: totalPrice * 100, // Convert to kobo
            currency: "NGN",
            ref: "txn_" + new Date().getTime(),
            metadata: {
                name: clientDetails.name,
                phoneNumber: clientDetails.phone,
            },
            callback: (response) => {
                console.log("✅ Payment Successful:", response);
                window.open(response.data.authorization_url, "_blank"); // ✅ Open in a new tab
            },
            onClose: () => {
                console.log("❌ Payment Modal Closed");
            },
        });
    
        setTimeout(() => {
            handler.openIframe(); // ✅ Timeout ensures script is fully loaded
        }, 1000);
    };
    console.log("PaystackPop Exists?", !!window.PaystackPop);    

    return (
        <div>
            {loading ? (
                <p>Loading Paystack...</p>
            ) : (
                <button className={className} onClick={initializePayment}>
                    {btnText}
                </button>
            )}
        </div>
    );
};

export default PaystackCheckout;
