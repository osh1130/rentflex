import axios from 'axios';

const api = axios.create({
  //http://mock:8000/api
  baseURL: 'http://localhost:8001/api',
  withCredentials: true
});

export default api;

