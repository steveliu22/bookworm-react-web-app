import { createSlice } from '@reduxjs/toolkit';
import {
  findAllBookByIdThunk,
  findAllBooksByAuthorThunk,
  findAllBooksByIdThunk,
  createBookThunk,
  findAllBooksBySearchThunk,
  findRandomBookThunk,
  findAllBooksByIdThunk2,
  deleteBookThunk,
} from '../thunks/books-thunks';

const initialState = {
  books: [],
  authorBooks: [],
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

    [findAllBooksByIdThunk2.fulfilled]: (state, action) => {
      state.authorBooks = action.payload;
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

    [findRandomBookThunk.fulfilled]: (state, action) => {
      state.details = action.payload;
    },

    [deleteBookThunk.fulfilled]: (state, action) => {
      const find1 = state.books.findIndex((b) => {
        return b._id === action.payload;
      });

      const find2 = state.authorBooks.findIndex((b) => {
        return b._id === action.payload;
      });

      if (find1 === 0) {
        state.books.shift();
      } else {
        state.books.splice(find1, find1);
      }

      if (find2 === 0) {
        state.authorBooks.shift();
      } else {
        state.authorBooks.splice(find2, find2);
      }
    },
  },
});

export default booksReducer.reducer;
