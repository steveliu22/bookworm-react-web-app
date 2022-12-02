import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerThunk } from '../thunks/users-thunks';

const RegisterComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validatePassword, setValidatePassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('REVIEWER');
  const dispatch = useDispatch();
  const handleRegisterBtn = () => {
    if (username === '') {
      console.log('You must provide a username');
      return;
    }

    if (password === '' || validatePassword === '') {
      console.log(
        'You cannot leave either the password or repeat password fields blank'
      );
      return;
    }
    if (password !== validatePassword) {
      console.log('Passwords must be matching');
      return;
    }
    console.log(undefined);
    dispatch(registerThunk({ username, password, role, email }));
  };
  return (
    <>
      <div className="d-flex justify-content-center align-items-center pe-0 pt-5 mt-5 pb-0">
        <img src="./images/logo.png" alt="" width={100} height={100} />
      </div>
      <div className="d-flex justify-content-center align-items-center pt-5">
        <div className="row w-25 border p-3 pb-1 border-dark rounded">
          <div className="form-group ps-0 pe-0">
            <h6>Username</h6>
            <input
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Your Username"
              name="username"
              required
            />
          </div>

          <div className="form-group pt-4 ps-0 pe-0">
            <h6>Password</h6>
            <input
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Your Password"
              name="password"
              required
            />
          </div>

          <div className="form-group pt-4 ps-0 pe-0">
            <h6>Repeat Password</h6>
            <input
              className="form-control"
              value={validatePassword}
              onChange={(e) => setValidatePassword(e.target.value)}
              type="password"
              placeholder="Repeat your Password"
              name="repeat-password"
              required
            />
          </div>

          <div className="form-group pt-4 ps-0 pe-0">
            <h6>Email</h6>
            <input
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Your Email"
              name="email"
            />
          </div>

          <div className="form-group pt-4 ps-0 pe-0 d-flex justify-content-center align-items-center">
            <div className="row">
              <div className="col-lg-6 col-xl-6 col-xxl-6 form-check p-5 pb-2 pt-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="role"
                  onChange={() => setRole('REVIEWER')}
                  checked
                />
                <label className="form-check-label" htmlFor="role">
                  Reviewer
                </label>
              </div>
              <div className="col-lg-6 col-xl-6 col-xxl-6 form-check p-5 pb-2 pt-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="role"
                  onChange={() => setRole('AUTHOR')}
                />
                <label className="form-check-label" htmlFor="role">
                  Author
                </label>
              </div>
            </div>
          </div>

          <div className="form-group pt-4 ps-0 pe-0 justify-content-center text-center">
            <div className="pb-2">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleRegisterBtn}
              >
                Register
              </button>
            </div>
            <Link to="/login">
              <p className="fs-8 small">Login here</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterComponent;
