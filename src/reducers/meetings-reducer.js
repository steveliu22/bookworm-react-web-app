import { createSlice } from '@reduxjs/toolkit';
import {
  createMeetingThunk,
  deleteMeetingThunk,
  findMeetingsByUserThunk,
  findMeetingsThunk,
} from '../thunks/meetings-thunks';

const initialState = {
  meetings: [],
  userMeetings: [],
};

const meetingsReducer = createSlice({
  name: 'meetings',
  initialState,
  extraReducers: {
    [findMeetingsThunk.fulfilled]: (state, action) => {
      state.meetings = action.payload;
    },

    [findMeetingsByUserThunk.fulfilled]: (state, action) => {
      state.userMeetings = action.payload;
    },

    [createMeetingThunk.fulfilled]: (state, action) => {
      state.meetings.push(action.payload);
      state.userMeetings.push(action.payload);
    },

    [deleteMeetingThunk.fulfilled]: (state, action) => {
      const find1 = state.meetings.findIndex((m) => {
        return m._id === action.payload;
      });

      const find2 = state.userMeetings.findIndex((m) => {
        return m._id === action.payload;
      });

      if (find1 === 0) {
        state.meetings.shift();
      } else {
        state.meetings.splice(find1, find1);
      }

      if (find2 === 0) {
        state.userMeetings.shift();
      } else {
        state.userMeetings.splice(find2, find2);
      }
    },
  },
});

export default meetingsReducer.reducer;
