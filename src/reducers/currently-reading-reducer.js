import { createSlice } from '@reduxjs/toolkit';
import {
  createCurrentlyReadingThunk,
  deleteCurrentlyReadingThunk,
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

    [deleteCurrentlyReadingThunk.fulfilled]: (state, action) => {
      const find = state.currentlyReading.findIndex((b) => {
        return b._id === action.payload;
      });
      if (find === 0) {
        state.currentlyReading.shift();
      } else {
        state.currentlyReading.splice(find, find);
      }
    },
  },
});

export default currentlyReadingReducer.reducer;
