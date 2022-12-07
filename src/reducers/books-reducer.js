import { createSlice } from '@reduxjs/toolkit';
import {
  findAllBookByIdThunk,
  findAllBooksByIdThunk,
} from '../thunks/books-thunks';

const initialState = {
  books: [],
};
const booksReducer = createSlice({
  name: 'books',
  initialState,
  extraReducers: {
    [findAllBookByIdThunk.fulfilled]: (state, action) => {
      state.books.push(action.payload);
    },

    [findAllBooksByIdThunk.fulfilled]: (state, action) => {
      state.books = action.payload;
    },
  },
});

export default booksReducer.reducer;
