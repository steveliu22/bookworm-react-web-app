import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { loginThunk, updateUserThunk } from '../thunks/users-thunks';

const PersonalInformationComponent = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);
  const [username, setUsername] = useState(currentUser.username);
  const [password, setPassword] = useState(currentUser.password);
  const [email, setEmail] = useState(currentUser.email);
  const [birthday, setBirthday] = useState(currentUser.birthday);
  const [phoneNumber, setPhoneNumber] = useState(currentUser.phoneNumber);
  const { success } = useSelector((state) => state.users);
  const infoArray = [
    {
      header: 'My Username',
      information: username,
      inputType: 'text',
      onChangeFunc: setUsername,
    },
    {
      header: 'My Password',
      information: password,
      inputType: 'text',
      onChangeFunc: setPassword,
    },
    {
      header: 'My Birthday',
      information: birthday,
      inputType: 'date',
      onChangeFunc: setBirthday,
    },
    {
      header: 'My Phone Number',
      information: phoneNumber,
      inputType: 'tel',
      onChangeFunc: setPhoneNumber,
    },
    {
      header: 'My Email',
      information: email,
      inputType: 'email',
      onChangeFunc: setEmail,
    },
  ];

  const handleUpdateProfileBtn = async () => {
    const updater = { ...currentUser };
    updater.username = username;
    updater.password = password;
    updater.email = email;
    updater.birthday = birthday;
    updater.phoneNumber = phoneNumber;
    await dispatch(updateUserThunk(updater));
    await dispatch(loginThunk({ username, password }));
    if (success !== '') {
      toast.success(success);
    }
  };

  return (
    <>
      <h4 className="lead text-center">My Information (private)</h4>
      <ul className="list-group">
        {infoArray.map((info, idx) => {
          return (
            <li key={idx} className="list-group-item pt-2">
              <div className="row">
                <div className="col-lg-6">
                  <span className="d-none d-xxl-block text-primary fw-bolder h6 small">
                    {`${info.header}: `}
                  </span>
                </div>
                <div className="col-md-12 col-lg-12 col-xxl-6">
                  <input
                    className="form-control"
                    defaultValue={info.information}
                    onChange={(e) => info.onChangeFunc(e.target.value)}
                    type={info.inputType}
                    placeholder={info.header}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="pt-2 text-center">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={async () => await handleUpdateProfileBtn()}
        >
          Change Profile
        </button>
      </div>
    </>
  );
};

export default PersonalInformationComponent;
