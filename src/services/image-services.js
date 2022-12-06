import axios from 'axios';
import FormData from 'form-data';
import { BASE_URL } from './api';

const session = axios.create({ withCredentials: true });

export const uploadImage = async (file) => {
  const data = new FormData();
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  data.append('file', file, file.name);
  const response = await session.post(`${BASE_URL}/upload`, data, config);
  return response.data;
};
