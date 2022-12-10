import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  DEFAULT_LOGO_HEIGHT,
  DEFAULT_LOGO_IMAGE,
  DEFAULT_LOGO_WIDTH,
} from '../shared/helpers';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.users);
  const navigation = useNavigate();

  if (currentUser) {
    return children;
  }

  return (
    <div className="d-flex justify-content-center align-items-center pt-5">
      <div className="row text-center h-100 p-0">
        <div className="mt-2 mb-4">
          <img
            src={DEFAULT_LOGO_IMAGE}
            alt=""
            width={DEFAULT_LOGO_WIDTH}
            height={DEFAULT_LOGO_HEIGHT}
          />
        </div>
        <div className="pb-5">
          <h1>You are not logged in</h1>
        </div>
        <div className="col-6 p-0 mb-2">
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => navigation('/login')}
          >
            Login
          </button>
        </div>
        <div className="col-6 p-0 mb-2">
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => navigation('/register')}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoute;
