import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  FetchImagePath,
  DEFAULT_LOGO_WIDTH,
  DEFAULT_LOGO_HEIGHT,
} from '../shared/helpers';
import NavigationSidebar from '../navigation/navigation';
import { findReviewsByAuthorThunk } from '../thunks/review-thunks';
import { findAllBooksByIdThunk } from '../thunks/books-thunks';
import { findUserCurrentlyReadingThunk } from '../thunks/currently-reading-thunks';

const PublicReviewerProfile = (selectedUser) => {
  const currentUser = selectedUser.selectedUser;
  const { reviews } = useSelector((state) => state.reviews);
  const { currentlyReading } = useSelector((state) => state.currentlyReading);
  const dispatch = useDispatch();

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
  return (
    <div className="p-5">
      <div className="row">
        <div className="col-2">
          <NavigationSidebar />
        </div>
        <div className="col-10 p-0 m-0 rounded p-5 ps-3 pt-3">
          <div className="bg-primary rounded p-4">
            <div className="ps-5">
              <div className="row">
                <div className="col-6 col-sm-6 col-md-5 col-xxl-6 text-center">
                  <img
                    src={FetchImagePath(currentUser.profilePicture)}
                    alt=""
                    width={DEFAULT_LOGO_WIDTH + 50}
                    height={DEFAULT_LOGO_HEIGHT + 50}
                  />
                </div>

                <div className="col-12 col-sm-6 col-md-7 col-xxl-6 d-flex align-items-center justify-content-start">
                  <p className="h3 text-white">
                    {currentUser.username}'s Profile
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row p-4">
            <div className="col-9">
              <div>
                <h5>{currentUser.username}'s Reviews</h5>
                <ul className="list-group pt-4">
                  {reviews.map((review) => {
                    return (
                      <li key={review.review} className="list-group pb-4">
                        <div className="row">
                          <div className="col-5">
                            <Link
                              className="text-decoration-none"
                              to={`/details/${review.bookID}`}
                            >
                              <p className="fs-6 lead">{review.bookID}</p>
                            </Link>
                          </div>
                          <div className="col-7">{review.review}</div>
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
      </div>
    </div>
  );
};

export default PublicReviewerProfile;
