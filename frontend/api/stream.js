import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export async function addStreamItem(token, data, bugId) {
  const result = await axios.post(`${API_URL}/bugs/${bugId}/stream`, data, {
    headers: { Authorization: `Bearer:${token}` },
  });
  return result;
}
