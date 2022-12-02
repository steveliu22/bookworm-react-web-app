import axios from 'axios';
import BASE_URL from './api';

const api = axios.create({ withCredentials: true });
export const createUser = async () => {};

export const findAllUsers = async () => {
  const response = await api.get(`${BASE_URL}/users`);
  return response.data;
};

export const register = async (user) => {
  const response = await api.post(`${BASE_URL}/register`, user);
  return response.data;
};

export const login = async (user) => {
  const response = await api.post(`${BASE_URL}/login`, user);
  return response.data;
};

export const profile = async () => {
  const response = await api.post(`${BASE_URL}/profile`);
  return response.data;
};

// export const deleteUser = async (uid) => {};

// export const updateUser = async (uid, update) => {};
