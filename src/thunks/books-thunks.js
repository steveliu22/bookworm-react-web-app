import { createAsyncThunk } from '@reduxjs/toolkit';
import { findAllBookById, findAllBooksById } from '../services/books-services';

export const findAllBookByIdThunk = createAsyncThunk('findAllBookById', (bid) =>
  findAllBookById(bid)
);

export const findAllBooksByIdThunk = createAsyncThunk(
  'findAllBooksById',
  async (bids) => await findAllBooksById(bids)
);
