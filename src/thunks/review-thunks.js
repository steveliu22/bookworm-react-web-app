import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createReview,
  findReviewsByAuthor,
  findReviewsByBook,
} from '../services/reviews-services';

export const createReviewThunk = createAsyncThunk(
  'createReview',
  async (review) => await createReview(review)
);

export const findReviewsByAuthorThunk = createAsyncThunk(
  'findReviewsByAuthor',
  async (uid) => findReviewsByAuthor(uid)
);

export const findReviewsByBookThunk = createAsyncThunk(
  'findReviewsByBook',
  async (bid) => findReviewsByBook(bid)
);
