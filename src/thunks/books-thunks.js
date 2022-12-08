import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  findAllBookById,
  findAllBooksById,
  findAllBooksByAuthor,
  createBook,
  findAllBooksBySearch,
} from '../services/books-services';

export const findAllBookByIdThunk = createAsyncThunk('findAllBookById', (bid) =>
  findAllBookById(bid)
);

export const createBookThunk = createAsyncThunk('createBook', (book) =>
  createBook(book)
);

export const findAllBooksByIdThunk = createAsyncThunk(
  'findAllBooksById',
  async (bids) => await findAllBooksById(bids)
);

export const findAllBooksByAuthorThunk = createAsyncThunk(
  'findAllBooksByAuthor',
  async (uid) => await findAllBooksByAuthor(uid)
);

export const findAllBooksBySearchThunk = createAsyncThunk(
  'findAllBooksBySearch',
  async (search) => await findAllBooksBySearch(search)
);
