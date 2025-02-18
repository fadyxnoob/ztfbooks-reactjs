import axios from 'axios';


export class DBService {
    constructor() { }

    // get all faqs from the backend using api
    async getAllFaqs() {
        try {
            const res = await axios.get(import.meta.env.VITE_SWAGGER_ALL_FAQS_API);
            return res.data;
        } catch (error) {
            console.error("Error fetching FAQs:", error.response ? error.response.data : error.message);
            return null;
        }
    }

    // get all approved books from the backend using api
    async getApprovedBooks() {
        try {
            const res = await axios.get(import.meta.env.VITE_GET_APPROVED_BOOKS_API_KEY)
            return res.data;
        } catch (error) {
            console.error('Failed to Get Approved Books ::', error)
        }
    }

    // get best Sales books from the backend using api
    async getBestSalesBooks() {
        try {
            const res = await axios.get(import.meta.env.VITE_GET_BEST_SALES_BOOKS_API_KEY)
            // console.log('service response ::',{res})
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
                responseType: 'blob', // Important for image display
            });
            return response;
        } catch (error) {
            console.error('Failed to get file by name:', error);
            return null;
        }
    }

    // upload file using api
    async uploadFile(file) {
        try {
            const file = await axios.post(import.meta.env.VITE_GET_FILE_BY_NAME_API_KEY)
            return file;
        } catch (error) {
            console.error('Failed to Get File by name::', error)
        }
    }

    //  delete file using api 
    async deleteFile(file) {
        try {
            const file = await axios.pull(import.meta.env.VITE_GET_BEST_SALES_BOOKS_API_KEY)
            return file;
        } catch (error) {
            console.error('Failed to Get File by name::', error)
        }
    }


    //  Reset Password 
    async resetPassword() {
        try {
            const res = await axios.post(import.meta.env.VITE_RESET_PASSWORD_API_KEY)
            return res;
        } catch (error) {
            console.error('Failed to reset password::', error)
        }
    }

    // resend otp 
    async resendOTP() {
        try {
            const res = await axios.get(import.meta.env.VITE_RESEND_OTP_API_KEY)
            return res;
        } catch (error) {
            console.error('Failed to resend otp::', error)
        }
    }

    // get all categories
    async getCategories() {
        try {
            const res = await axios.get(import.meta.env.VITE_GET_ALL_CATEGORIES_API_KEY)
            return res;
        } catch (error) {
            console.error('Failed get categories::', error)
        }
    }

    async getBookByID (id){
        try {
            const res = await axios.get(`${import.meta.env.VITE_GET_SINGLE_EBOOK_BY_ID_API_KEY}${id}`)
            return res;
        } catch (error) {
            console.log('DBService:: Failed to fetch Single book by ID', error)
        }
    }




}

const service = new DBService();
export default service;