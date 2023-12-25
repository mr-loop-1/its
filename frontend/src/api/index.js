import axios from 'axios';

export default async function loginUser(data) {
  console.log('🚀 ~ file: index.js:4 ~ loginUser= ~ data:', data);
  const result = await axios.post('http://localhost:5000/auth/login', data);
  console.log('🚀 ~ file: index.js:6 ~ loginUser ~ result:', result);

  const { token, user } = result.data;
  return result.data;
}
