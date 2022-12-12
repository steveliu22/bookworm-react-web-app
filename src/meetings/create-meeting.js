import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  DEFAULT_LOGO_HEIGHT,
  DEFAULT_LOGO_IMAGE,
  DEFAULT_LOGO_WIDTH,
} from '../shared/helpers';
import { createMeetingThunk } from '../thunks/meetings-thunks';

const CreateMeeting = () => {
  const { currentUser } = useSelector((state) => state.users);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateBtn = () => {
    if (name === '') {
      toast.error('You must provide a name for your meeting');
      return;
    }

    if (description === '') {
      toast.error('Your must provide a description for your meeting');
      return;
    }

    if (location === '') {
      toast.error('You must provide a location for your meeting');
      return;
    }

    if (date === '') {
      toast.error('Your must provide a date for your meeting');
      return;
    }

    if (time === '') {
      toast.error('Your must provide a time for your meeting');
      return;
    }
    const scheduledTime = `${date} @ ${time}`;
    dispatch(
      createMeetingThunk({
        name,
        user: currentUser,
        description,
        location,
        time: scheduledTime,
      })
    );

    navigate('/meetings');
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center pe-0 mt-1 pb-2 ">
        <img
          src={DEFAULT_LOGO_IMAGE}
          alt=""
          width={DEFAULT_LOGO_WIDTH}
          height={DEFAULT_LOGO_HEIGHT}
        />
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <div className="row w-50 border p-3 pb-1 border-dark rounded">
          <div className="form-group ps-0 pe-0">
            <h6 className="small">Meeting Name</h6>
            <input
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Your Meeting Name"
              name="name"
              required
            />
          </div>

          <div className="form-group pt-4 ps-0 pe-0">
            <h6 className="small">Description</h6>
            <input
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Your Meeting Description"
              name="description"
              required
            />
          </div>

          <div className="form-group pt-4 ps-0 pe-0">
            <h6 className="small">Location</h6>
            <input
              className="form-control"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              placeholder="Your Meeting Location"
              name="location"
              required
            />
          </div>

          <div className="form-group pt-4 ps-0 pe-0">
            <h6 className="small">Date</h6>
            <input
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              placeholder="Meeting Date"
              name="date"
            />
          </div>

          <div className="form-group pt-4 ps-0 pe-0">
            <h6 className="small">Time</h6>
            <input
              className="form-control"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              type="time"
              min="00:00"
              max="23:59"
              placeholder="Meeting Time"
              name="time"
            />
          </div>

          <div className="form-group pt-4 ps-0 pe-0 text-center">
            <div className="pb-2">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCreateBtn}
              >
                Schedule Meeting
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateMeeting;
