import axios from 'axios';

// Change this to your API base URL
const BASE_URL = 'http://3.7.81.243/projects/plie-api/public/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// OPTIONAL — Add token to headers automatically
apiClient.interceptors.request.use(
  async config => {
    // Load saved token from storage if needed
    // const token = await AsyncStorage.getItem("token");

    const token = null; // update when implementing real login

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// OPTIONAL — Response interceptor
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.log('API ERROR:', error?.response?.data || error.message);
    return Promise.reject(error);
  },
);

export default apiClient;
