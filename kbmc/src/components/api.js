import axios from 'axios';

export const baseURL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL,
});

export default api;