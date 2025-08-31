import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
    
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('accessToken');
  if (
    token &&
    !req.url.includes('/auth/verify-email') &&
    !req.url.includes('/auth/login') &&
    !req.url.includes('/auth/register') &&
    !req.url.includes('/auth/forgot-password') &&
    !req.url.includes('/auth/reset-password')
  ) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});


export default API;
