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
  }, []);

  const getUser = () => {
    if (users.length > 0) {
      return users[0];
    }
    return null;
  };

  const renderCurrentUser = () => {
    const currUser = getUser();
    if (!currUser) {
      return <h1>Loading...</h1>;
    }

    if (currUser.role === 'REVIEWER') {
      return <PublicReviewerProfile user={currUser} />;
    }

    return <PublicAuthorProfile user={currUser} />;
  };
  return <>{renderCurrentUser()}</>;
};

export default PublicProfile;
