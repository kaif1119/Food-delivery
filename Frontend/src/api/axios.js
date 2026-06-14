import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Matches Vite proxy path to route to http://localhost:3000/api
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
