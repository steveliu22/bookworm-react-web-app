import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FetchImagePath,
  DEFAULT_LOGO_WIDTH,
  DEFAULT_LOGO_HEIGHT,
} from '../shared/helpers';
import NavigationSidebar from '../navigation/navigation';
import { findReviewsByAuthorThunk } from '../thunks/review-thunks';
import { findUserCurrentlyReadingThunk } from '../thunks/currently-reading-thunks';
import PersonalInformationComponent from './personal-information';
import UserReviewerCurrentlyReading from './user-reviewer-currently-reading';

const ReviewerProfile = () => {
  const { currentUser } = useSelector((state) => state.users);
  const { reviews } = useSelector((state) => state.reviews);
  const { currentlyReading } = useSelector((state) => state.currentlyReading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      dispatch(findReviewsByAuthorThunk(currentUser._id));
      dispatch(findUserCurrentlyReadingThunk(currentUser._id));
    }
  }, [currentUser]);

  const allBooks = () => {
    const reviewBooks = reviews.map((r) => r.bookID);
    const currentlyReadingBooks = currentlyReading.map((cr) => cr.bookID);
    const combine = [...reviewBooks, ...currentlyReadingBooks];
    return combine;
  };
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
          <UserReviewerCurrentlyReading
            books={allBooks()}
            reviews={reviews}
            currentlyReading={currentlyReading}
            user={undefined}
          />
        </div>
        <div className="col-3">
          {currentUser && (
            <>
              <PersonalInformationComponent />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewerProfile;
