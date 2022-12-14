import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  findAllBookById,
  findAllBooksById,
  findAllBooksByAuthor,
  createBook,
  findAllBooksBySearch,
  findRandomBook,
  deleteBook,
} from '../services/books-services';

export const findAllBookByIdThunk = createAsyncThunk(
  'findAllBookById',
  async (bid) => await findAllBookById(bid)
);

export const createBookThunk = createAsyncThunk(
  'createBook',
  async (book) => await createBook(book)
);

export const findAllBooksByIdThunk = createAsyncThunk(
  'findAllBooksById',
  async (bids) => await findAllBooksById(bids)
);

export const findAllBooksByIdThunk2 = createAsyncThunk(
  'findAllBooksById2',
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

export const findRandomBookThunk = createAsyncThunk(
  'findRandomBook',
  async () => await findRandomBook()
);

export const deleteBookThunk = createAsyncThunk(
  'deleteBook',
  async (bid) => await deleteBook(bid)
);
