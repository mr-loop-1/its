import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export async function createBug(token, data, projectId) {
  const result = await axios.post(
    `${API_URL}/projects/${projectId}/bug`,
    data,
    {
      headers: { Authorization: `Bearer:${token}` },
    },
  );

  return result;
}

export const getBug = async (token, bugId) => {
  const result = await axios.get(`${API_URL}/bugs/${bugId}`, {
    headers: { Authorization: `Bearer:${token}` },
  });
  return result;
};

export const editBug = async (token, data, bugId) => {
  const result = await axios.patch(`${API_URL}/bugs/${bugId}`, data, {
    headers: { Authorization: `Bearer:${token}` },
  });
  return result;
};

export const deleteBug = async (token, bugId) => {
  const result = await axios.delete(`${API_URL}/bugs/${bugId}`, {
    headers: { Authorization: `Bearer:${token}` },
  });
  return result;
};
