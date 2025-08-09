import axios from 'axios';


export const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_API_BASE_URL,
    withCredentials:true
})
// Suppress error logs
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // ✅ Do NOT console.error here
    // You can show toast or ignore silently
    return Promise.reject(error); // Still lets you handle in .catch()
  }
);
