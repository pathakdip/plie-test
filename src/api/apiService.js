import apiClient from './apiClient';

export const loginUser = async (email, password) => {
  return apiClient.post('/login', {
    email,
    password,
  });
};

export const registerUser = async data => {
  return apiClient.post('/register', data);
};

export const getUserProfile = async () => {
  return apiClient.get('/profile');
};

export const getEventsList = () => {
  return apiClient.post('/events-listing');
};
