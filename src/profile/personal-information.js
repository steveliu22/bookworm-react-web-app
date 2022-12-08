import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUserThunk } from '../thunks/users-thunks';

const PersonalInformationComponent = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);
  const [username, setUsername] = useState(currentUser.username);
  const [password, setPassword] = useState(currentUser.password);
  const [email, setEmail] = useState(currentUser.email);
  const [birthday, setBirthday] = useState(currentUser.birthday);
  const [phoneNumber, setPhoneNumber] = useState(currentUser.phoneNumber);
  const { success } = useSelector((state) => state.users);
  const handleUpdateProfileBtn = () => {
    const updater = { ...currentUser };
    updater.username = username;
    updater.password = password;
    updater.email = email;
    updater.birthday = birthday;
    updater.phoneNumber = phoneNumber;

    dispatch(updateUserThunk(updater));

    if (success !== '') {
      toast.success(success);
    }
  };
  const infoArray = [
    {
      header: 'My Username',
      information: currentUser.username,
      inputType: 'text',
      onChangeFunc: setUsername,
    },
    {
      header: 'My Password',
      information: currentUser.password,
      inputType: 'text',
      onChangeFunc: setPassword,
    },
    {
      header: 'My Birthday',
      information: currentUser.birthday,
      inputType: 'date',
      onChangeFunc: setBirthday,
    },
    {
      header: 'My Phone Number',
      information: currentUser.phoneNumber,
      inputType: 'tel',
      onChangeFunc: setPhoneNumber,
    },
    {
      header: 'My Email',
      information: currentUser.email,
      inputType: 'email',
      onChangeFunc: setEmail,
    },
  ];

  return (
    <>
      <h4 className="lead text-center">My Information (private)</h4>
      <ul className="list-group">
        {infoArray.map((info) => {
          return (
            <li key={info.information} className="list-group-item pt-2">
              <div className="row">
                <div className="col-6">
                  <span className="text-primary fw-bolder fs-6">
                    {`${info.header}: `}
                  </span>
                </div>
                <div className="col-6">
                  <span className="lead fs-6 float">
                    <input
                      className="form-control"
                      type={info.inputType}
                      defaultValue={info.information}
                      onChange={(e) => info.onChangeFunc(e.target.value)}
                    />
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="pt-2 text-center">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleUpdateProfileBtn}
        >
          Change Profile
        </button>
      </div>
    </>
  );
};

export default PersonalInformationComponent;
