import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || process.env.VITE_API_URL;

export const getInvites = async (token) => {
  const result = await axios.get(`${API_URL}/users/invites`, {
    headers: { Authorization: `Bearer:${token}` },
  });
  return result;
};

export const acceptInvite = async (token, inviteId) => {
  const result = await axios.post(
    `${API_URL}/users/invites/${inviteId}`,
    {},
    {
      headers: { Authorization: `Bearer:${token}` },
    },
  );
  return result;
};

export const sendInvite = async (token, data, projectId) => {
  const result = await axios.post(
    `${API_URL}/projects/${projectId}/user`,
    data,
    {
      headers: { Authorization: `Bearer:${token}` },
    },
  );
  return result;
};
