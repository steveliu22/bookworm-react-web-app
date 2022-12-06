import { createSlice } from '@reduxjs/toolkit';
import {
  findBooksBySearchTermThunk,
  findBookByIdThunk,
} from '../thunks/google-books-thunks';

const initialState = {
  books: [],
  details: null,
};
const googleBooksReducer = createSlice({
  name: 'googleBooks',
  initialState,
  extraReducers: {
    [findBooksBySearchTermThunk.fulfilled]: (state, action) => {
      state.books = action.payload;
    },
    [findBookByIdThunk.fulfilled]: (state, action) => {
      state.details = action.payload;
    },
  },
});

export default googleBooksReducer.reducer;
