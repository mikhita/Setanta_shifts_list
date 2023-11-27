import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; 

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const register = async (userData: any) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post(`${API_BASE_URL}/registration/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const AuthService = {
  register,
};

export default AuthService;
