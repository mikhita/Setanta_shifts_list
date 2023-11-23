// AuthService.js
import axios from 'axios';

const baseURL = 'http://localhost:3000'; // Update with your actual backend URL

const AuthService = {
  login: async (email: unknown, password: unknown) => {
    try {
      const response = await axios.post(`${baseURL}/auth/login`, { email, password });

      if (response.status === 200) {
        // Login successful
        return response.data.token;
      } else {
        // Login failed
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      // Handle network or other errors
      throw new Error('Login failed');
    }
  },
};

export default AuthService;
