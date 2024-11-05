import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// URL API backend
const API_URL = 'http://10.0.2.2:3001'; // Change this to your API URL

// Get access token from AsyncStorage
const getAccessToken = async () => {
  return await AsyncStorage.getItem('token');
};

// Get refresh token from AsyncStorage
const getRefreshToken = async () => {
  return await AsyncStorage.getItem('refreshToken');
};

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
});

// Add token to each request
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error)
    return Promise.reject(error);
  }
);

// Handle errors and refresh token on 401 Unauthorized
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = await getRefreshToken();
      try {
        const res = await axios.post(`${API_URL}/auth/refresh-token`, { refreshToken });
        const { token } = res.data;

        // Store new access token in AsyncStorage
        await AsyncStorage.setItem('token', token);

        // Retry the original request with the new access token
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
        originalRequest.headers['Authorization'] = `Bearer ${token}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle token refresh failure
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('refreshToken');
        // Optionally navigate to login screen
        // For example, using React Navigation
        // navigation.navigate('Login');
        // or you can redirect:
        console.log("Token het han")
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
