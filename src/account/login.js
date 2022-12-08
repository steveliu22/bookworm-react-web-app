import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  DEFAULT_LOGO_HEIGHT,
  DEFAULT_LOGO_IMAGE,
  DEFAULT_LOGO_WIDTH,
} from '../shared/helpers';
import { loginThunk } from '../thunks/users-thunks';

const LoginComponent = () => {
  const { error } = useSelector((state) => state.users);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLoginBtn = () => {
    dispatch(loginThunk({ username, password }));
    if (error !== '') {
      toast.error(error);
      return;
    }
    navigate('/');
  };
  return (
    <>
      <div className="d-flex justify-content-center align-items-center pe-0 pt-5 mt-5 pb-0">
        <img
          src={DEFAULT_LOGO_IMAGE}
          alt=""
          width={DEFAULT_LOGO_WIDTH}
          height={DEFAULT_LOGO_HEIGHT}
        />
      </div>
      <div className="d-flex justify-content-center align-items-center pt-5">
        <div className="row w-25 border p-3 pb-1 border-dark rounded">
          <div className="form-group ps-0 pe-0">
            <h6>Username</h6>
            <input
              className="form-control"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your Username"
              name="username"
              required
            />
          </div>

          <div className="form-group pt-4 ps-0 pe-0">
            <h6>Password</h6>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your Password"
              name="password"
              required
            />
          </div>

          <div className="form-group pt-4 ps-0 pe-0 justify-content-center text-center">
            <div className="pb-2">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleLoginBtn}
              >
                Login
              </button>
            </div>
            <Link to="/register">
              <p className="fs-8 small">Register here</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginComponent;
