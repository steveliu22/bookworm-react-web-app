import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { registerThunk } from '../thunks/users-thunks';
import { uploadImageThunk } from '../thunks/image-thunks';
import {
  DEFAULT_LOGO_HEIGHT,
  DEFAULT_LOGO_IMAGE,
  DEFAULT_LOGO_WIDTH,
} from '../shared/helpers';

const RegisterComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validatePassword, setValidatePassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('REVIEWER');
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureName, setProfilePictureName] =
    useState('default-logo.png');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.users);
  const handleRegisterBtn = () => {
    if (username === '') {
      toast.error('You must provide a username');
      return;
    }

    if (password === '') {
      toast.error('Your must provide a valid password');
      return;
    }

    if (password !== validatePassword) {
      toast.error('Password and repeat password must be matching');
      return;
    }

    if (email === '') {
      toast.error('Your must provide a valid email');
      return;
    }

    if (birthday === '') {
      toast.error('Your must provide a valid birthday');
      return;
    }

    if (phoneNumber === '') {
      toast.error('Your must provide a valid phone number');
      return;
    }

    if (!profilePicture) {
      toast.error('Your must provide a valid profile picture');
      return;
    }

    dispatch(uploadImageThunk(profilePicture));

    dispatch(
      registerThunk({
        username,
        password,
        role,
        email,
        birthday,
        phoneNumber,
        profilePicture: profilePictureName,
      })
    );

    if (error !== '') {
      toast.error(error);
      return;
    }

    navigate('/');
    navigate(0);
  };
  return (
    <>
      <div className="d-flex justify-content-center align-items-center pe-0 mt-1 pb-2 ">
        <img
          src={DEFAULT_LOGO_IMAGE}
          alt=""
          width={DEFAULT_LOGO_WIDTH}
          height={DEFAULT_LOGO_HEIGHT}
        />
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <div className="row w-50 border p-3 pb-1 border-dark rounded">
          <div className="form-group ps-0 pe-0">
            <h6 className="small">Username</h6>
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
            <h6 className="small">Password</h6>
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
            <h6 className="small">Repeat Password</h6>
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
            <h6 className="small">Email</h6>
            <input
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Your Email"
              name="email"
            />
          </div>

          <div className="form-group pt-4 ps-0 pe-0">
            <h6 className="small">Birthday</h6>
            <input
              className="form-control"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              type="date"
              placeholder="Your Birthday (optional)"
              name="birthday"
            />
          </div>

          <div className="form-group pt-4 ps-0 pe-0">
            <h6 className="small">Phone #</h6>
            <input
              className="form-control"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="tel"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              maxLength="12"
              placeholder="Your Phone Number (optional)"
              name="phoneNumber"
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
                <label className="form-check-label small" htmlFor="role">
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
                <label className="form-check-label small" htmlFor="role">
                  Author
                </label>
              </div>
            </div>
          </div>

          <div className="form-group pt-2 ps-0 pe-0">
            <h6 className="small">Profile Picture</h6>
            <form encType="multipart/form-data">
              <input
                className="form-control fs-6"
                type="file"
                name="displayImage"
                onChange={(e) => {
                  setProfilePicture(e.target.files[0]);
                  setProfilePictureName(e.target.files[0].name);
                }}
              />
            </form>
          </div>

          <div className="form-group pt-4 ps-0 pe-0 text-center">
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
