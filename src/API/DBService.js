import axios from 'axios';
import { getLocalStorage } from '../LocalStorage/LocalStorage';


export class DBService {
    token = getLocalStorage('userdata')
    constructor() { }

    // website logo
    async getLogo() {
        try {
            const response = await axios.get(
                'https://server.ztfbooks.com/opn/v1/ztf-ebooks/logo',
                { responseType: 'blob' } // Fetch as a blob
            );

            const imageBlob = response.data;
            const imageUrl = URL.createObjectURL(imageBlob);
            return imageUrl;
        } catch (error) {
            console.error('Failed to get website logo:', error);
            return null;
        }
    }

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
            const res = await axios.get(`${import.meta.env.VITE_GET_BEST_SALES_BOOKS_API_KEY}${limit}`)
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

    // get currency by id
    async getCurrencyByID(id) {
        try {
            const response = await axios.get(`https://server.ztfbooks.com/cmn/v1/currencies/${id}`,
                {
                    headers: {
                        "Content-Type": 'application/json',
                        Authorization: `Bearer ${this.token.jwtToken}`,
                    }
                }
            )
            return response.data
        } catch (error) {
            console.log('Failed to get currency by ID ::', error)
        }
    }
    // get about us data
    async getAboutUs() {
        try {
            const res = await axios.get(import.meta.env.VITE_ABOUTUS_API_KEY)
            return res.data
        } catch (error) {
            console.error('failed to get about us::', error)
        }
    }

    // get reviews 
    async getReviewesByBookID(id) {
        try {
            const response = await axios.get(`https://server.ztfbooks.com/opn/v1/e-book/reviews/${id}`);
            // console.log('from book ID::',{response})
            return response?.data;
        } catch (error) {
            console.log('Failed to get reviews:::', error)
        }
    }

    // get flutterwave Credentials
    async getFlutterwaveCredentials() {
        try {
            if (!this.token) {
                console.warn('Please Login first')
            }

            const response = await axios.get('https://server.ztfbooks.com/cmn/v1/flutterwave/credentials', {
                headers: {
                    Authorization: `Bearer ${this.token.jwtToken}`,
                    'Content-Type': 'application/json'
                }
            })
            return response.data;
        } catch (error) {
            console.error("Error fetching Flutterwave credentials:", error.response?.data || error.message);
            throw error;
        }
    };

    // get Stripe Credentials
    async getStripeCredentials() {
        try {
            if (!this.token.jwtToken) {
                console.warn('Please Login first')
            }

            const response = await axios.get('https://server.ztfbooks.com/client/v1/stripe/credentials', {
                headers: {
                    Authorization: `Bearer ${this.token.jwtToken}`,
                    'Content-Type': 'application/json'
                }
            })
            return response.data;
        } catch (error) {
            console.error("Error fetching Flutterwave credentials:", error.response?.data || error.message);
            throw error;
        }
    };

    // make your payment
    async initiatePayment(paymentData) {
        console.log({ paymentData })
        try {
            if (!this.token || !this.token.jwtToken) {
                console.error("Error: Authorization token is missing.");
                return;
            }

            const payload = {
                currencyCode: paymentData.currencyCode || "EUR",
                totalAmount: Math.round(paymentData.totalAmount || 0),
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

            console.log("✅ Payment Successful:", response.data);
            return response.data;

        } catch (error) {
            console.error("Payment Failed:", error.response?.data || error.message || "Unknown error");
            throw error;
        }
    }

    // get all categories form APi
    async getAllCategories () {
        try {
            const response = await axios.get('https://server.ztfbooks.com/opn/v1/categories/all')
            return response.data
        } catch (error) {
            console.error('Failed to get all categories ::', error)
        }
    }
    // get category by name 
    async getSingleCategory(name){
        try {
            const res = await axios.get(`https://server.ztfbooks.com/opn/v1/categories/by-name/${name}`)
            return res.data
        } catch (error) {
            console.log('Failed to get single category::', error)
        }
    }

}

const service = new DBService();
export default service;



