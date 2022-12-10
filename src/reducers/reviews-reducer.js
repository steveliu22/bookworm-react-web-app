import { createSlice } from '@reduxjs/toolkit';
import {
  createReviewThunk,
  deleteReviewThunk,
  findReviewsByAuthorThunk,
  findReviewsByBookThunk,
} from '../thunks/review-thunks';

const reviewsReducer = createSlice({
  name: 'reviews',
  initialState: {
    reviews: [],
  },
  extraReducers: {
    [createReviewThunk.fulfilled]: (state, action) => {
      state.reviews.push(action.payload);
    },

    [findReviewsByAuthorThunk.fulfilled]: (state, action) => {
      state.reviews = action.payload;
    },

    [findReviewsByBookThunk.fulfilled]: (state, action) => {
      state.reviews = action.payload;
    },

    [deleteReviewThunk.fulfilled]: (state, action) => {
      const find = state.reviews.findIndex((b) => {
        return b._id === action.payload;
      });
      if (find === 0) {
        state.reviews.shift();
      } else {
        state.reviews.splice(find, find);
      }
    },
  },
});

export default reviewsReducer.reducer;
