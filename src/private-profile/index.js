import React from 'react';
import { useSelector } from 'react-redux';
import AuthorProfile from './author-profile';
import ReviewerProfile from './reviewer-profile';

const ProfileComponent = () => {
  const { currentUser } = useSelector((state) => state.users);
  const renderCurrentUser = () => {
    if (currentUser === undefined) {
      return <h1>Loading...</h1>;
    }

    if (currentUser.role === 'REVIEWER') {
      return <ReviewerProfile />;
    }

    return <AuthorProfile />;
  };
  return <div>{renderCurrentUser()}</div>;
};

export default ProfileComponent;
