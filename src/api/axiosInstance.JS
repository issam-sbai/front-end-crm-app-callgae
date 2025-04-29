import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://my-express-mongo-app.onrender.com/api/',
});

// Add the token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
