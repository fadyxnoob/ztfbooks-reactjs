import axios from 'axios';

export class AuthService {
    constructor() { }

    async signup(data) {
        try {
            const response = await axios.post(
                import.meta.env.VITE_SIGNUP_API_KEY,
                data,
            );

            console.log('Signup successful:', response.data);
            return { status: 200, message: 'Your account has been created' }; // Return the response data (e.g., user details, token, etc.)
        } catch (error) {
            console.error('Failed to signup:', error.response ? error.response.data : error.message);
            throw error; // Re-throw the error to handle it in the calling component
        }
    }
    async login(data) {
        try {
            const response = await axios.post(
                import.meta.env.VITE_LOGIN_API_KEY,
                data,
            );

            console.log('Login successful:', response);

            // Return only serializable data
            return {
                status: 200,
                message: 'You are logged in',
                data: response.data
            };
        } catch (error) {
            console.error('Failed to login:', error.response ? error.response.data : error.message);
            throw error;
        }
    }

    async getCurrentLoggedIn(){
        try {
            const response = await axios.get(
                ProcessingInstruction.meta.env.VITE_GET_CURRENT_LOGGEDIN_API_KEY
            )
            console.log('The Logged-in Account is ::', response)
        } catch (error) {
            console.error('Error getting Current LoggedIN::', error)
        }
    }
}

const authService = new AuthService();
export default authService;