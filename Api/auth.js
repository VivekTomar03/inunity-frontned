import axios from 'axios';

// const API_URL = 'https://inunity-backend.onrender.com';
const API_URL = 'http://192.168.29.166:8080';


//  user registration
export const registerUser = async (name , email, password) => {
  try {
    const response = await axios.post(`${API_URL}/user/register`, {name , email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// user login
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, { email, password });
    return response?.data;
  } catch (error) {
    throw error?.response?.data;
  }
};
