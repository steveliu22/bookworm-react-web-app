import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NavigationSidebar from '../navigation/navigation';
import SearchResult from '../search/search-result';
import {
  DEFAULT_LOGO_IMAGE,
  DEFAULT_LOGO_WIDTH,
  DEFAULT_LOGO_HEIGHT,
  NormalizeBookObject,
} from '../shared/helpers';
import {
  findAllBooksByAuthorThunk,
  findRandomBookThunk,
} from '../thunks/books-thunks';
import { findUserCurrentlyReadingThunk } from '../thunks/currently-reading-thunks';
import { findReviewsByAuthorThunk } from '../thunks/review-thunks';

const HomeComponent = () => {
  const { currentUser } = useSelector((state) => state.users);
  const { details } = useSelector((state) => state.books);
  const { reviews } = useSelector((state) => state.reviews);
  const { currentlyReading } = useSelector((state) => state.currentlyReading);
  const { books } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findRandomBookThunk());
    if (currentUser) {
      dispatch(findReviewsByAuthorThunk(currentUser._id));
      if (currentUser.role === 'AUTHOR') {
        dispatch(findAllBooksByAuthorThunk(currentUser._id));
      } else {
        dispatch(findUserCurrentlyReadingThunk(currentUser._id));
      }
    }
  }, [currentUser]);

  const displayInfo = () => {
    const displayArray = [];
    if (currentlyReading.length > 0) {
      const mostRecentCurrentlyReading = currentlyReading[0];
      displayArray.push(
        <li className="list-group-item mt-5 border-0">
          <h6 className="lead">You're currently reading</h6>
          <Link to={`/details/${mostRecentCurrentlyReading._id}`}>
            {mostRecentCurrentlyReading._id}
          </Link>
        </li>
      );
    } else {
      displayArray.push(
        <li className="list-group-item mt-4 border-0">
          <p className="lead display-7">
            You're currently not reading any books
          </p>
        </li>
      );
    }

    if (currentUser) {
      if (currentUser.role === 'AUTHOR') {
        if (books.length > 0) {
          const mostRecentBook = books[0];
          displayArray.push(
            <li className="list-group-item mt-4 border-0">
              <h6 className="lead">Your most recent book</h6>
              <Link to={`/details/${mostRecentBook._id}`}>
                {mostRecentBook._id}
              </Link>
            </li>
          );
        } else {
          displayArray.push(
            <li className="list-group-item mt-4 border-0">
              <p className="lead display-7">You've added no books</p>
            </li>
          );
        }
      }

      if (currentUser.role === 'REVIEWER') {
        if (reviews.length > 0) {
          const mostRecentReview = reviews[0];
          displayArray.push(
            <li className="list-group-item mt-5 border-0">
              <h6 className="lead">Your Most Recent Review</h6>
              <Link to={`/details/${mostRecentReview.bookID}`}>
                {mostRecentReview.bookID}
              </Link>
            </li>
          );
        } else {
          displayArray.push(
            <li className="list-group-item mt-4 border-0">
              <p className="lead display-7">You've made no recent posts</p>
            </li>
          );
        }
      }
    }
    return displayArray;
  };

  return (
    <div className="p-5">
      <div className="row">
        <div className="col-md-4 col-lg-2">
          <NavigationSidebar />
        </div>
        <div className="col-md-6 col-lg-8 pt-0 pb-0 p-5 text-center">
          <div>
            <p className="lead display-6">Welcome to Bookworm!</p>
          </div>
          <div>
            <p className="lead display-7">
              Your free online book review website
            </p>
          </div>
          <div>
            <div className="p-0">
              <p className="text-start fw-bold text-success">
                Your randomly picked book!
              </p>
              <div className="p-0">
                {details === '' ? (
                  <h1>Loading..</h1>
                ) : (
                  <SearchResult book={NormalizeBookObject(details)} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-2 col-lg-2 p-0 text-center border rounded h-75 p-3">
          <div className="pt-3">
            <img
              src={DEFAULT_LOGO_IMAGE}
              alt=""
              width={DEFAULT_LOGO_WIDTH}
              height={DEFAULT_LOGO_HEIGHT}
            />
          </div>
          {currentUser ? (
            <ul className="list-group">
              {displayInfo().map((display) => display)}
            </ul>
          ) : (
            <ul className="list-group">
              <li className="list-group-item border-0 mt-5">
                <p className="lead display-7">
                  Login or register to leave reviews!
                </p>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
