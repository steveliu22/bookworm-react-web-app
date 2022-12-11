import { createSlice } from '@reduxjs/toolkit';
import {
  createCurrentlyReadingThunk,
  deleteCurrentlyReadingThunk,
  findAllUsersCurrentlyReadingThunk,
  findUserCurrentlyReadingThunk,
} from '../thunks/currently-reading-thunks';

const currentlyReadingReducer = createSlice({
  name: 'currentlyReading',
  initialState: {
    currentlyReading: [],
    usersCurrentlyReading: [],
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
    [findAllUsersCurrentlyReadingThunk.fulfilled]: (state, action) => {
      state.usersCurrentlyReading = action.payload;
    },
  },
});

export default currentlyReadingReducer.reducer;
