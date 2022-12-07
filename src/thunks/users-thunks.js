import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  findAllUsers,
  register,
  login,
  profile,
  logout,
  updateUser,
} from '../services/user-services';

export const findAllUsersThunk = createAsyncThunk(
  'findAllUsers',
  async () => await findAllUsers()
);

export const registerThunk = createAsyncThunk(
  'register',
  async (credentials) => await register(credentials)
);

export const loginThunk = createAsyncThunk(
  'login',
  async (credentials) => await login(credentials)
);

export const logoutThunk = createAsyncThunk(
  'logout',
  async (user) => await logout(user)
);

export const profileThunk = createAsyncThunk(
  'profile',
  async (credentials) => await profile(credentials)
);

export const updateUserThunk = createAsyncThunk(
  'updateUser',
  async (update) => await updateUser(update)
);
