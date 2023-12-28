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

  return { data: result.data, status: result.status };
}
