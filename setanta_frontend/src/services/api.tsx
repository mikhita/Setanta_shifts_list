import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; 

export const getEmployees = async () => {
  const response = await axios.get(`${API_BASE_URL}/employees`);
  return response.data;
};

export const getShifts = async () => {
  const response = await axios.get(`${API_BASE_URL}/shifts`);
  return response.data;
};

export const getWeekdays = async () => {
  const response = await axios.get(`${API_BASE_URL}/weekdays`);
  return response.data;
};
