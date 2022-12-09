import { createSlice } from '@reduxjs/toolkit';
import {
  findAllUsersThunk,
  registerThunk,
  loginThunk,
  profileThunk,
  logoutThunk,
  updateUserThunk,
  findUserByIdThunk,
} from '../thunks/users-thunks';

const usersReducer = createSlice({
  name: 'users',

  initialState: {
    loading: false,
    users: [],
    currentUser: null,
    error: '',
    success: '',
  },
  extraReducers: {
    [findAllUsersThunk.fulfilled]: (state, action) => {
      state.users = action.payload;
    },

    [registerThunk.fulfilled]: (state, action) => {
      state.error = '';
      state.currentUser = action.payload;
    },

    [registerThunk.rejected]: (state) => {
      state.error = 'Invalid Registration/Login Attempt';
      state.currentUser = null;
    },

    [loginThunk.fulfilled]: (state, action) => {
      state.error = '';
      state.currentUser = action.payload;
    },

    [loginThunk.rejected]: (state) => {
      state.error = 'Invalid Registration/Login Attempt';
      state.currentUser = null;
    },

    [logoutThunk.fulfilled]: (state) => {
      state.currentUser = null;
    },

    [profileThunk.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },

    [profileThunk.pending]: (state, action) => {
      state.currentUser = action.payload;
      state.error = 'Loading...';
    },

    [profileThunk.rejected]: (state, action) => {
      state.error = action.payload;
      state.currentUser = null;
    },

    [updateUserThunk.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
      state.success = 'Succesfully Changed Your Profile';
    },

    [findUserByIdThunk.fulfilled]: (state, action) => {
      state.users = [action.payload];
    },
  },
});

export default usersReducer.reducer;
