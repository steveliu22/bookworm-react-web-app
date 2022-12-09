import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { findUserByIdThunk } from '../thunks/users-thunks';
import PublicAuthorProfile from './public-author-profile';
import PublicReviewerProfile from './public-reviewer-profile';

const PublicProfile = () => {
  const { users } = useSelector((state) => state.users);
  const { uid } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findUserByIdThunk(uid));
  });

  const displayPage = () => {
    if (users.length !== 0) {
      const theUser = users[0];
      if (theUser.role === 'REVIEWER') {
        return <PublicReviewerProfile selectedUser={theUser} />;
      }

      return <PublicAuthorProfile />;
    }

    return <h1>Loading...</h1>;
  };

  return displayPage();
};

export default PublicProfile;
