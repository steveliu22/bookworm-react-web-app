import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FetchImagePath } from '../shared/helpers';
import NavigationSidebar from '../navigation/navigation';
import { findReviewsByAuthorThunk } from '../thunks/review-thunks';
import { findAllBooksByIdThunk } from '../thunks/books-thunks';
import { findUserCurrentlyReadingThunk } from '../thunks/currently-reading-thunks';
import PersonalInformationComponent from './personal-information';

const ReviewerProfile = () => {
  const { currentUser } = useSelector((state) => state.users);
  const { reviews } = useSelector((state) => state.reviews);
  const { books } = useSelector((state) => state.books);
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
  console.log(books);
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
          <PersonalInformationComponent />
        </div>
      </div>
    </div>
  );
};

export default ReviewerProfile;
