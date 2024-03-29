import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || process.env.VITE_API_URL;

export const loginUser = async (data) => {
  const result = await axios.post(`${API_URL}/auth/login`, data);
  return result.data;
};

export const registerUser = async (data) => {
  const result = await axios.post(`${API_URL}/auth/register`, data);
  return result.data;
};

export const pingUser = async (data) => {
  const result = await axios.post(`${API_URL}/auth/ping`, data);
  return result.status;
};

export const pingServer = async () => {
  const result = await axios.get(`${API_URL}`);
  return result.status;
};
