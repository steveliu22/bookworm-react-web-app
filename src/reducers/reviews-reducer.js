import { createSlice } from '@reduxjs/toolkit';
import {
  createReviewThunk,
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
  },
});

export default reviewsReducer.reducer;
