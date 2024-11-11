import axios from 'axios';

export const baseURL = 'http://103.50.163.53:5000/api';

const api = axios.create({
  baseURL,
});

export default api;