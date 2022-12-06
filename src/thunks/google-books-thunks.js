import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  findBooksBySearchTerm,
  findBookById,
} from '../services/google-books-services';

export const findBooksBySearchTermThunk = createAsyncThunk(
  'findBooksBySearchTerm',
  (search) => findBooksBySearchTerm(search)
);

export const findBookByIdThunk = createAsyncThunk('findBookById', (bid) =>
  findBookById(bid)
);
