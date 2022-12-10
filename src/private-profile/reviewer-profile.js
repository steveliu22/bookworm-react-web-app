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
                  <p className="h5 text-white">My Profile</p>
                </div>
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
        {currentUser && (
          <div className="col-3">
            <PersonalInformationComponent />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewerProfile;
