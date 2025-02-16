import axios from 'axios';


export class DBService {
    constructor() { }

    async getAllFaqs() {
        try {
            const res = await axios.get(import.meta.env.VITE_SWAGGER_ALL_FAQS_API);
            return res.data;
        } catch (error) {
            console.error("Error fetching FAQs:", error.response ? error.response.data : error.message);
            return null;
        }
    }
}

const service = new DBService();
export default service;