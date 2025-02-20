import axios from 'axios';
import { getLocalStorage } from '../LocalStorage/LocalStorage';


export class DBService {
    token = getLocalStorage('userdata')
    constructor() { }

    // get all faqs from the backend using api
    async getAllFaqs(apiKey) {
        try {
            const res = await axios.get(apiKey);
            // console.log({res})
            return res;
        } catch (error) {
            console.error("Error fetching FAQs:", error.response ? error.response.data : error.message);
            return null;
        }
    }

    // get all approved books from the backend using api
    async getApprovedBooks(apiKey) {
        // console.log(apiKey)
        try {
            const res = await axios.get(apiKey)
            return res.data;
        } catch (error) {
            console.error('Failed to Get Approved Books ::', error)
        }
    }

    // get best Sales books from the backend using api
    async getBestSalesBooks(limit) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_GET_BEST_SALES_BOOKS_API_KEY}${limit || 4}`)
            return res.data;
        } catch (error) {
            console.error('Failed to Get Approved Books ::', error)
        }
    }

    // get a file from the backend using API
    async getFileByName(fileName) {
        if (!fileName) {
            console.warn('File name is undefined');
            return null;
        }

        try {
            const response = await axios.get(`${import.meta.env.VITE_GET_FILE_BY_NAME_API_KEY}${fileName}`, {
                responseType: 'blob',
            });

            // Check if imageRes.data is a Blob before creating object URL
            if (response.data && response.data instanceof Blob) {
                const imageUrl = URL.createObjectURL(response.data);
                // console.log({imageUrl})
                return imageUrl

            } else {
                console.error("Image data is not a valid Blob or file.");
            }

            return imageUrl;
        } catch (error) {
            console.error('Failed to get file by name:', error);
            return null;
        }
    }

    // upload file using api
    async uploadFile(file) {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post(
                import.meta.env.VITE_Upload_FILE_BY_NAME_API_KEY,
                formData,
                {
                    headers: {
                        'accept': '*/*',
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log('File uploaded res:::', response.data)
            return response.data;
        } catch (error) {
            console.error('Failed to upload file:', error);
        }
    }

    // get single ebook by id
    async getBookByID(id) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_GET_SINGLE_EBOOK_BY_ID_API_KEY}${id}`)
            return res;
        } catch (error) {
            console.log('DBService:: Failed to fetch Single book by ID', error)
        }
    }

    // get default currency
    async getDefaultCurrency() {
        try {

            const response = await axios.get(import.meta.env.VITE_DEFAULT_CURRENCY_API_KEY, {
                headers: {
                    Authorization: `Bearer ${this.token.jwtToken}`,
                    'Content-Type': 'application/json',
                },
            });
            // console.log({response})
            return response.data
        } catch (error) {
            console.error('Failed to get Default Currency::', error)
        }
    }


    // make your payment
    async makeYourPayment(paymentData) {
        try {
            if (!this.token || !this.token.jwtToken) {
                console.error("Error: Authorization token is missing.");
                return;
            }
    
            const payload = {
                currencyCode: paymentData.currencyCode || "EUR",
                totalAmount: paymentData.totalAmount || 0,
                cartIds: Array.isArray(paymentData.cartIds) ? paymentData.cartIds : [],
                paymentMethod: paymentData.paymentMethod || "VOUCHER",
                integratorPublicId: paymentData.integratorPublicId,
                metadata: paymentData.metadata || {}
            };
    
            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token.jwtToken}`
            };
    
            const response = await axios.post(
                import.meta.env.VITE_CHECKOUT_API_KEY,
                payload,
                { headers }
            );
    
            console.log("Payment Successful:", response);
            return response; 
    
        } catch (error) {
            console.error("Payment Failed:", error.response?.data || error.message || "Unknown error");
    
            // More detailed error handling
            if (error.response) {
                console.error("Response Status:", error.status);
                console.error("Response:", error);
            }
    
            throw error; // Rethrow for handling in UI
        }
    }
    
    // get about us data
    async getAboutUs(){
        try {
            const res = await axios.get(import.meta.env.VITE_ABOUTUS_API_KEY)
            return res.data
        } catch (error) {
            console.error('failed to get about us::',error)
        }
    }

}

const service = new DBService();
export default service;