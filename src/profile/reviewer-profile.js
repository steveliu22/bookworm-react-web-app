import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FetchImagePath } from '../shared/helpers';
import NavigationSidebar from '../navigation/navigation';
import { findReviewsByAuthorThunk } from '../thunks/review-thunks';
import { updateUserThunk } from '../thunks/users-thunks';
import { findAllBooksByIdThunk } from '../thunks/books-thunks';
import { findUserCurrentlyReadingThunk } from '../thunks/currently-reading-thunks';

const ReviewerProfile = () => {
  const { currentUser } = useSelector((state) => state.users);
  const { reviews } = useSelector((state) => state.reviews);
  const { books } = useSelector((state) => state.books);
  const { currentlyReading } = useSelector((state) => state.currentlyReading);
  const [username, setUsername] = useState(currentUser.username);
  const [password, setPassword] = useState(currentUser.password);
  const [email, setEmail] = useState(currentUser.email);
  const [birthday, setBirthday] = useState(currentUser.birthday);
  const [phoneNumber, setPhoneNumber] = useState(currentUser.phoneNumber);
  const dispatch = useDispatch();
  const handleUpdateProfileBtn = () => {
    const updater = {
      username,
      password,
      email,
      birthday,
      phoneNumber,
      role: currentUser.role,
      profilePicture: currentUser.profilePicture,
    };

    dispatch(updateUserThunk({ uid: currentUser._id, ...updater }));
  };

  useEffect(() => {
    dispatch(findReviewsByAuthorThunk(currentUser._id));
    dispatch(findUserCurrentlyReadingThunk(currentUser._id));
    dispatch(
      findAllBooksByIdThunk(
        reviews.map((review) => {
          return review.bookID;
        })
      )
    );
  }, []);
  console.log(books);

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
    <div className="p-5">
      <div className="row">
        <div className="col-2">
          <NavigationSidebar />
        </div>
        <div className="col-7 border p-5 rounded">
          <div className="row">
            <div className="col-3">
              <img
                src={FetchImagePath(currentUser.profilePicture)}
                alt=""
                className="w-75"
              />
            </div>

            <div className="col-9">
              <div>
                <h5>{currentUser.username}'s Reviews</h5>
                <ul className="list-group pt-4">
                  {reviews.map((review) => {
                    return (
                      <li key={review.review} className="list-group pb-4">
                        <div className="row">
                          <div className="col-3">
                            <Link
                              className="text-decoration-none"
                              to={`/details/${review.bookID}`}
                            >
                              <p className="fs-6 lead">{review.bookID}</p>
                              {JSON.stringify(books)}
                            </Link>
                          </div>
                          <div className="col-9">{review.review}</div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="pt-5">
                <h5>{currentUser.username} is currently reading...</h5>
                <ul className="list-group pt-4">
                  {currentlyReading.map((read) => {
                    return (
                      <li key={read._id} className="list-group pb-4">
                        <div className="row">
                          <div className="col-3">
                            <Link
                              className="text-decoration-none"
                              to={`/details/${read.bookID}`}
                            >
                              <p className="fs-6 lead">{read.bookID}</p>
                            </Link>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-3">
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
        </div>
      </div>
    </div>
  );
};

export default ReviewerProfile;
