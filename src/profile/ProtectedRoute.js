import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.users);
  if (currentUser) {
    return children;
  }
  return <Navigate to="/login" />;
};

export default ProtectedRoute;
