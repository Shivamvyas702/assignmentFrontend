import axios from 'axios';

const API = axios.create({
    baseURL: 'https://assignmentbackend-production-c9be.up.railway.app/api',
    
});

// Add token to request headers
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('accessToken');
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

export default API;
