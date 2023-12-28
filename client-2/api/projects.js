import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export async function getProjects(data) {}

export async function createProject(token, data) {
  const result = await axios.post(`${API_URL}/projects`, data, {
    headers: { Authorization: `Bearer:${token}` },
  });

  return { data: result.data, status: result.status };
}

// export async function registerUser(data) {}

// export async function getAllProjects(data) {}
