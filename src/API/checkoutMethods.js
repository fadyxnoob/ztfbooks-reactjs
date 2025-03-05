import axios from "axios";
import { getLocalStorage } from "../LocalStorage/LocalStorage";

const token = getLocalStorage('userdata')?.jwtToken;

const getPayStackCredentials = async () => {
    try {
        const res = await axios.get('https://server.ztfbooks.com/cmn/v1/paystack/credentials', {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return res.data;  
    } catch (error) {
        console.error("Error fetching Paystack credentials:", error);
        return null;  
    }
};

export {
    getPayStackCredentials
};
