import axios from 'axios';
import { getLocalStorage } from '../LocalStorage/LocalStorage';

export class AuthService {
    token = getLocalStorage('userdata').jwtToken;
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
            // console.log('Signup successful:', response.data);
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

            if (!this.token) {
                console.error("No token found in localStorage");
                return;
            }

            const response = await axios.get(import.meta.env.VITE_GET_CURRENT_LOGGEDIN_API_KEY, {
                headers: {
                    Authorization: `Bearer ${this.token}`, // Send token in the Authorization header
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
            if (response.status === 200 && (userData.name && userData.email)) {
                const res = await axios.put(
                    `${import.meta.env.VITE_UPDATE_EMAIL_AND_NAME_API_KEY}`,
                    {
                        name: userData.name,
                        email: userData.email,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                if (res.status === 200) {
                    return res;
                }
            }

            return response.data;
        } catch (error) {
            console.error('Error updating user:', error.response?.data || error.message);
        }
    }

    // signup with google 
    async signUpWithGoogle(idToken, displayName) {
        try {
            const response = await axios.post(
                import.meta.env.VITE_SIGNUP_WITH_GOOGLE_API_KEY,
                {
                    idToken: idToken,
                    displayName: displayName,
                    authProvider: "GOOGLE",
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        accept: "*/*",
                    },
                }
            );

            console.log("API Response:", response.data);
        } catch (error) {
            console.error("Error signing up:", error.response?.data || error.message);
        }
    };

    // Login with google 
    async loginWithGoogle(access_token) {
        try {
            // Fetch User Info from Google API
            const googleUser = await axios.get(
                `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
            );

            const userData = {
                idToken: googleUser.data.sub, // Unique Google ID
                displayName: googleUser.data.name,
                authProvider: "GOOGLE",
            };

            // Send user data to your backend API for login
            const response = await axios.post(
                "https://server.ztfbooks.com/opn/v1/client/social/login", // Change to your login endpoint
                userData,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            console.log("Login Success:", response.data);
            return response.data;
        } catch (error) {
            console.error("Google Login Error:", error.response?.data || error.message);
            throw new Error("Login failed. Please try again.");
        }
    };

}

const authService = new AuthService();
export default authService;