import React from 'react';
import { useSelector } from 'react-redux';
import AuthorProfile from './author-profile';
import ReviewerProfile from './reviewer-profile';

const ProfileComponent = () => {
  const { currentUser } = useSelector((state) => state.users);
  return (
    <div>
      {currentUser.role === 'REVIEWER' ? (
        <ReviewerProfile />
      ) : (
        <AuthorProfile user={currentUser} />
      )}
    </div>
  );
};

export default ProfileComponent;
