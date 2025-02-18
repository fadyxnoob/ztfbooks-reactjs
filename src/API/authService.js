import axios from 'axios';
import { getLocalStorage } from '../LocalStorage/LocalStorage';

export class AuthService {
    constructor() { }

    // signup user using api
    async signup(data) {
        const apiUrl = import.meta.env.VITE_SIGNUP_API_KEY;
        if (!apiUrl) {
            console.error('Signup API URL is missing!');
            return;
        }

        try {
            const response = await axios.post(apiUrl, data);
            console.log('Signup successful:', response.data);
            return { status: 200, message: 'Your account has been created' };
        } catch (error) {
            console.error('Failed to signup:', error.response?.data || error.message);
            throw error;
        }
    }



    // let the user login using api
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

    // get logged in user 
    async getCurrentLoggedIn() {
        try {
            const userData = JSON.parse(localStorage.getItem('userdata'));
            const token = userData?.jwtToken;
            if (!token) {
                console.error("No token found in localStorage");
                return;
            }

            const response = await axios.get(import.meta.env.VITE_GET_CURRENT_LOGGEDIN_API_KEY, {
                headers: {
                    Authorization: `Bearer ${token}`, // Send token in the Authorization header
                }
            });
            // console.log('The Logged-in Account is ::', response);
            return response.data;
        } catch (error) {
            console.error('Error getting Current LoggedIN::', error);
        }
    }


    // update user 
    async updateUser(userId, userData) {
        try {
            const token = JSON.parse(localStorage.getItem('userdata'))?.jwtToken;
            if (!token) {
                throw new Error('No token found. Please log in again.');
            }

            const response = await axios.put(
                `${import.meta.env.VITE_UPDATE_USER_API_KEY}${userId}`,
                {
                    image: userData.image,
                    contactDetails: {
                        phoneNumber: userData.phoneNumber,
                        physicalAddress: userData.physicalAddress,
                        city: userData.city,
                        country: userData.country
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            // console.log('User updated successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error updating user:', error.response?.data || error.message);
        }
    }


}

const authService = new AuthService();
export default authService;