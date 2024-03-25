import axios from "axios";

// Create a new instance of Axios
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api", // Your API base URL
  timeout: 5000, // Request timeout
  headers: {
    "Content-Type": "application/json" // Default content type
  }
});

// Add a request interceptor to set the Authorization header with the token
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from local storage or wherever you store it
    const token = localStorage.getItem("token");

    // If a token exists, set the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

export default axiosInstance;
