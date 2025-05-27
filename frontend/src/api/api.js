import axios from 'axios';

// API URL configuration based on environment
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Clear token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // Handle other errors
    const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
    console.error('API Error:', errorMessage);
    
    return Promise.reject({
      ...error,
      message: errorMessage
    });
  }
);

// Simple in-memory cache implementation
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Cache wrapper function
export const withCache = async (key, callback, duration = CACHE_DURATION) => {
  const cached = cache.get(key);
  if (cached && cached.timestamp > Date.now() - duration) {
    return cached.data;
  }

  const data = await callback();
  cache.set(key, {
    timestamp: Date.now(),
    data
  });
  return data;
};

// Clear cache
export const clearCache = () => {
  cache.clear();
};

export default api;

