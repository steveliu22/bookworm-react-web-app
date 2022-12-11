import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  FetchImagePath,
  DEFAULT_LOGO_WIDTH,
  DEFAULT_LOGO_HEIGHT,
} from '../shared/helpers';
import NavigationSidebar from '../navigation/navigation';
import { findAllBooksByAuthorThunk } from '../thunks/books-thunks';
import PersonalInformationComponent from './personal-information';
import { findUserCurrentlyReadingThunk } from '../thunks/currently-reading-thunks';
import UserAuthorCurrentlyReading from './user-author-currently-reading';

const AuthorProfile = () => {
  const { currentUser } = useSelector((state) => state.users);
  const { books } = useSelector((state) => state.books);
  const { currentlyReading } = useSelector((state) => state.currentlyReading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      dispatch(findAllBooksByAuthorThunk(currentUser._id));
      dispatch(findUserCurrentlyReadingThunk(currentUser._id));
    }
  }, [currentUser]);
  return (
    <div className="p-3 ps-4 pe-4">
      <div className="row">
        <div className="col-2">
          <NavigationSidebar />
        </div>
        <div className="col-7 rounded p-5 pt-1">
          <div className="bg-primary rounded p-4">
            <div className="row">
              <div className="col-sm-5 col-md-5 col-lg-6 col-xxl-4 text-center pe-2">
                <img
                  src={FetchImagePath(currentUser.profilePicture)}
                  alt=""
                  width={DEFAULT_LOGO_WIDTH}
                  height={DEFAULT_LOGO_HEIGHT}
                />
              </div>

              <div className="col-sm-7 col-md-6 col-lg-6 col-xxl-6 my-auto p-0 text-center">
                <p className="h5 text-white lead">My Profile</p>
              </div>
            </div>
          </div>
          <UserAuthorCurrentlyReading
            books={books}
            currentlyReading={currentlyReading}
          />
        </div>
        <div className="col-3">
          {currentUser && (
            <>
              <PersonalInformationComponent />
              <div className="pt-2 text-center">
                <button
                  type="button"
                  className="btn btn-warning btn-sm"
                  onClick={() => navigate('/publish')}
                >
                  Add a Book
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile;
