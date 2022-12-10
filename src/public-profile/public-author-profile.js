import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DEFAULT_LOGO_WIDTH,
  DEFAULT_LOGO_HEIGHT,
  FetchImagePath,
} from '../shared/helpers';
import NavigationSidebar from '../navigation/navigation';
import { findAllBooksByAuthorThunk } from '../thunks/books-thunks';
import { findUserCurrentlyReadingThunk } from '../thunks/currently-reading-thunks';
import DisplayInfo from '../home/display-info';
import UserAuthorCurrentlyReading from '../private-profile/user-author-currently-reading';

const PublicAuthorProfile = (user) => {
  const currentUser = user.user;
  const { books } = useSelector((state) => state.books);
  const { currentlyReading } = useSelector((state) => state.currentlyReading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      dispatch(findAllBooksByAuthorThunk(currentUser._id));
      dispatch(findUserCurrentlyReadingThunk(currentUser._id));
    }
  }, []);
  return (
    <div className="p-5">
      <div className="row">
        <div className="col-2">
          <NavigationSidebar />
        </div>
        <div className="col-7 rounded p-5 pt-1">
          <div className="bg-primary rounded p-4">
            <div className="ps-5">
              <div className="row">
                <div className="col-6 col-sm-6 col-md-5 col-xxl-6 text-center">
                  <img
                    src={FetchImagePath(currentUser.profilePicture)}
                    alt=""
                    width={DEFAULT_LOGO_WIDTH}
                    height={DEFAULT_LOGO_HEIGHT}
                  />
                </div>

                <div className="col-12 col-sm-6 col-md-7 col-xxl-6 d-flex align-items-center justify-content-start">
                  <p className="h5 text-white">
                    {currentUser.username}'s Profile
                  </p>
                </div>
              </div>
            </div>
          </div>
          <UserAuthorCurrentlyReading
            books={books}
            currentlyReading={currentlyReading}
            user={currentUser}
          />
        </div>
        {currentUser && (
          <div className="col-md-2 col-lg-2 p-0 text-center border rounded h-75 p-3 mt-4">
            <DisplayInfo
              cr={currentlyReading}
              cu={currentUser}
              r={undefined}
              b={books}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicAuthorProfile;
