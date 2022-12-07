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
