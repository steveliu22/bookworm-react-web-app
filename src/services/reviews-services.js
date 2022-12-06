import axios from 'axios';
import { BASE_URL, REVIEWS_API } from './api';

const session = axios.create({ withCredentials: true });

export const createReview = async (review) => {
  const response = await session.post(REVIEWS_API, review);
  return response.data;
};

export const findReviewsByBook = async (bid) => {
  const response = await session.get(`${BASE_URL}/books/${bid}/reviews`);
  return response.data;
};

export const findReviewsByAuthor = async (uid) => {
  const response = await session.get(`${BASE_URL}/users/${uid}/reviews`);
  return response.data;
};
