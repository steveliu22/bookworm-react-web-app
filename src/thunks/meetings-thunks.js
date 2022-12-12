import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createMeeting,
  deleteMeeting,
  findMeetings,
  findMeetingsByUser,
} from '../services/meetings-services';

export const findMeetingsThunk = createAsyncThunk(
  'findMeetings',
  async () => await findMeetings()
);

export const createMeetingThunk = createAsyncThunk(
  'creatingMeeting',
  async (meeting) => await createMeeting(meeting)
);

export const deleteMeetingThunk = createAsyncThunk(
  'deleteMeeting',
  async (mid) => await deleteMeeting(mid)
);

export const findMeetingsByUserThunk = createAsyncThunk(
  'findMeetingsByUser',
  async (uid) => await findMeetingsByUser(uid)
);
