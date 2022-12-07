import { createSlice } from '@reduxjs/toolkit';
import {
  createCurrentlyReadingThunk,
  findUserCurrentlyReadingThunk,
} from '../thunks/currently-reading-thunks';

const currentlyReadingReducer = createSlice({
  name: 'currentlyReading',
  initialState: {
    currentlyReading: [],
  },

  extraReducers: {
    [createCurrentlyReadingThunk.fulfilled]: (state, action) => {
      state.currentlyReading.push(action.payload);
    },

    [findUserCurrentlyReadingThunk.fulfilled]: (state, action) => {
      state.currentlyReading = action.payload;
    },
  },
});

export default currentlyReadingReducer.reducer;
