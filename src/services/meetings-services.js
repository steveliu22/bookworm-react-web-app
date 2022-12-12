import axios from 'axios';
import { BASE_URL } from './api';

const session = axios.create({ withCredentials: true });

export const findMeetings = async () => {
  const response = await session.get(`${BASE_URL}/meetings`);
  return response.data;
};

export const createMeeting = async (meeting) => {
  const response = await session.post(`${BASE_URL}/meetings`, meeting);
  return response.data;
};

export const deleteMeeting = async (mid) => {
  await session.delete(`${BASE_URL}/meetings/${mid}`);
  return mid;
};

export const findMeetingsByUser = async (uid) => {
  const response = await session.get(`${BASE_URL}/users/${uid}/meetings`);
  return response.data;
};
