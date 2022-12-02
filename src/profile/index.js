import React from 'react';
import { useSelector } from 'react-redux';

const ProfileComponent = () => {
  const { currentUser } = useSelector((state) => state.users);
  return (
    <>
      <h1> Profile </h1>
      {currentUser && <h2> Welcome {currentUser.username} </h2>}
    </>
  );
};

export default ProfileComponent;
