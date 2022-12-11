import axios from 'axios';
import { BASE_URL } from './api';

const session = axios.create({ withCredentials: true });

export const createCurrentlyReading = async (currentlyReading) => {
  const response = await session.post(
    `${BASE_URL}/currentlyReading`,
    currentlyReading
  );
  return response.data;
};

export const findUserCurrentlyReading = async (uid) => {
  const response = await session.get(
    `${BASE_URL}/users/${uid}/currentlyReading`
  );

  return response.data;
};

export const deleteCurrentlyReading = async (crid) => {
  await session.delete(`${BASE_URL}/currentlyReading/${crid}`);
  return crid;
};

export const findAllUsersCurrentlyReading = async (bid) => {
  const response = await session.get(
    `${BASE_URL}/currentlyReading/${bid}/users`
  );

  return response.data;
};
