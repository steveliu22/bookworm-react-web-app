import { createAsyncThunk } from '@reduxjs/toolkit';
import { uploadImage } from '../services/image-services';

export const uploadImageThunk = createAsyncThunk(
  'upload',
  async (img) => await uploadImage(img)
);
