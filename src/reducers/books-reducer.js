import { createSlice } from '@reduxjs/toolkit';
import {
  findAllBookByIdThunk,
  findAllBooksByAuthorThunk,
  findAllBooksByIdThunk,
  createBookThunk,
  findAllBooksBySearchThunk,
} from '../thunks/books-thunks';

const initialState = {
  books: [],
  details: '',
};
const booksReducer = createSlice({
  name: 'books',
  initialState,
  extraReducers: {
    [findAllBookByIdThunk.fulfilled]: (state, action) => {
      state.details = action.payload;
    },

    [findAllBooksByIdThunk.fulfilled]: (state, action) => {
      state.books = action.payload;
    },

    [findAllBooksByAuthorThunk.fulfilled]: (state, action) => {
      state.books = action.payload;
    },

    [createBookThunk.fulfilled]: (state, action) => {
      state.books.push(action.payload);
    },

    [findAllBooksBySearchThunk.fulfilled]: (state, action) => {
      state.books = action.payload;
    },
  },
});

export default booksReducer.reducer;
