import { createSlice } from '@reduxjs/toolkit';
import {
  findAllUsersThunk,
  registerThunk,
  loginThunk,
  profileThunk,
} from '../thunks/users-thunks';

const usersReducer = createSlice({
  name: 'users',

  initialState: {
    loading: false,
    users: [],
    currentUser: null,
    error: null,
  },
  extraReducers: {
    [findAllUsersThunk.fulfilled]: (state, action) => {
      state.users = action.payload;
    },

    [registerThunk.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },

    [registerThunk.rejected]: (state, action) => {
      state.error = action.payload;
      state.currentUser = null;
    },

    [loginThunk.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },

    [loginThunk.rejected]: (state, action) => {
      state.error = action.payload;
      state.currentUser = null;
    },

    [profileThunk.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },

    [profileThunk.rejected]: (state, action) => {
      state.error = action.payload;
      state.currentUser = null;
    },
  },
  reducers: {},
});

export default usersReducer.reducer;