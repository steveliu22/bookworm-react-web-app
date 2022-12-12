import React from 'react';
import SingleMeeting from './single-meeting';

const Meetings = (props) => {
  const actualMeetings = props.meetings;
  const actualUserMeeting = props.userMeetings;

  return (
    <ul className="list-group">
      {actualMeetings.map((meeting) => {
        return (
          <li className="list-group border p-4 pb-2 mb-2 pb-0 mx-auto w-100">
            <SingleMeeting
              meeting={meeting}
              hide={
                actualUserMeeting.findIndex((m) => {
                  return meeting._id === m._id;
                }) !== -1
              }
            />
          </li>
        );
      })}
    </ul>
  );
};

export default Meetings;
