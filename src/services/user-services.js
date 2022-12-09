import axios from 'axios';
import { BASE_URL } from './api';

const api = axios.create({ withCredentials: true, timeout: 20000 });

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

export const logout = async (user) => {
  const response = await api.post(`${BASE_URL}/logout`, user);
  return response.data;
};

export const profile = async () => {
  const response = await api.post(`${BASE_URL}/profile`);
  return response.data;
};

export const deleteUser = async (uid) => {
  const response = await api.delete(`${BASE_URL}/users/${uid}`);
  return response.data;
};

export const updateUser = async (update) => {
  await api.put(`${BASE_URL}/users/${update._id}`, update);
  return update;
};

export const findUserById = async (uid) => {
  const response = await api.get(`${BASE_URL}/users/${uid}`);
  return response.data;
};
