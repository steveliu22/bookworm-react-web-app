import React from 'react';
import { Link } from 'react-router-dom';

const UsersReading = (currentlyReading) => {
  const actualUsers = currentlyReading.currentlyReading;
  return (
    <>
      <ul className="list-inline">
        <li className="list-inline-item fw-bold">Currently Read By:</li>
        {actualUsers.map((cr, idx) => (
          <li key={idx} className="list-inline-item">
            <Link
              className="text-decoration-none"
              to={`/profile/${cr.user._id}`}
            >{`${cr.user.username}`}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default UsersReading;
