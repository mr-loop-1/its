import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || process.env.VITE_API_URL;

export async function createProject(token, data) {
  const result = await axios.post(`${API_URL}/projects`, data, {
    headers: { Authorization: `Bearer:${token}` },
  });
  return result;
}

export const getProjects = async (token) => {
  const result = await axios.get(`${API_URL}/projects`, {
    headers: { Authorization: `Bearer:${token}` },
  });
  return result;
};

export const getProject = async (token, projectId) => {
  const result = await axios.get(`${API_URL}/projects/${projectId}`, {
    headers: { Authorization: `Bearer:${token}` },
  });
  return result;
};

export const getCommits = async (token, projectId) => {
  const result = await axios.get(`${API_URL}/projects/${projectId}/commits`, {
    headers: { Authorization: `Bearer:${token}` },
  });
  return result;
};

export const getStoredCommits = async (token, projectId) => {
  const result = await axios.get(`${API_URL}/projects/commits/${projectId}`, {
    headers: { Authorization: `Bearer:${token}` },
  });
  return result;
};

export const editProject = async (token, data, projectId) => {
  const result = await axios.patch(`${API_URL}/projects/${projectId}`, data, {
    headers: { Authorization: `Bearer:${token}` },
  });
  return result;
};

export const makeManager = async (token, projectId, data) => {
  const result = await axios.post(
    `${API_URL}/projects/${projectId}/manager`,
    data,
    {
      headers: { Authorization: `Bearer:${token}` },
    },
  );
  return result;
};

export const deleteProject = async (token, projectId) => {
  const result = await axios.delete(`${API_URL}/projects/${projectId}`, {
    headers: { Authorization: `Bearer:${token}` },
  });
  return result;
};

export const removeMember = async (token, projectId, userId) => {
  const result = await axios.delete(
    `${API_URL}/projects/${projectId}/${userId}`,
    {
      headers: { Authorization: `Bearer:${token}` },
    },
  );
  return result;
};
