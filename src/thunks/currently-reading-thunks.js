import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createCurrentlyReading,
  deleteCurrentlyReading,
  findUserCurrentlyReading,
} from '../services/currently-reading-services';

export const createCurrentlyReadingThunk = createAsyncThunk(
  'createCurrentlyReading',
  async (currentlyReading) => createCurrentlyReading(currentlyReading)
);

export const findUserCurrentlyReadingThunk = createAsyncThunk(
  'findUserCurrentlyReading',
  async (uid) => findUserCurrentlyReading(uid)
);

export const deleteCurrentlyReadingThunk = createAsyncThunk(
  'deleteCurrentlyReading',
  async (crid) => deleteCurrentlyReading(crid)
);
