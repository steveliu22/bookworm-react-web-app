import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteMeetingThunk } from '../thunks/meetings-thunks';

const SingleMeeting = (props) => {
  const actualMeeting = props.meeting;
  const notHideBtn = props.hide;
  const dispatch = useDispatch();

  const deleteOnClick = async () => {
    await dispatch(deleteMeetingThunk(actualMeeting._id));
  };
  return (
    <>
      <div className="font-size-sm">
        <p className="small">
          <span className="lead text-primary font-size-sm">Name: </span>
          {actualMeeting.name}
        </p>
        <p className="small">
          <span className="lead text-primary">Description: </span>
          {actualMeeting.description}
        </p>
        <p className="small">
          <span className="lead text-primary">Location: </span>
          {actualMeeting.location}
        </p>
        <p className="small">
          <span className="lead text-primary">Time: </span>
          {actualMeeting.time}
        </p>
        <p className="small">
          Scheduled by:{' '}
          <Link
            className="text-decoration-none"
            to={`/profile/${actualMeeting.user._id}`}
          >
            {actualMeeting.user.username}
          </Link>
        </p>
      </div>
      <div className="text-center">
        {notHideBtn && (
          <button
            type="button"
            className="btn btn-danger btn-sm small"
            onClick={async () => {
              await deleteOnClick();
            }}
          >
            Delete
          </button>
        )}
      </div>
    </>
  );
};

export default SingleMeeting;
