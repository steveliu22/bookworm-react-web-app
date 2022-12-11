import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createCurrentlyReading,
  deleteCurrentlyReading,
  findUserCurrentlyReading,
  findAllUsersCurrentlyReading,
} from '../services/currently-reading-services';

export const createCurrentlyReadingThunk = createAsyncThunk(
  'createCurrentlyReading',
  async (currentlyReading) => createCurrentlyReading(currentlyReading)
);

export const findUserCurrentlyReadingThunk = createAsyncThunk(
  'findUserCurrentlyReading',
  async (uid) => findUserCurrentlyReading(uid)
);

export const findAllUsersCurrentlyReadingThunk = createAsyncThunk(
  'findAllUsersCurrentlyReading',
  async (bid) => findAllUsersCurrentlyReading(bid)
);

export const deleteCurrentlyReadingThunk = createAsyncThunk(
  'deleteCurrentlyReading',
  async (crid) => deleteCurrentlyReading(crid)
);
