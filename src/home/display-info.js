import React from 'react';
import { Link } from 'react-router-dom';
import {
  DEFAULT_LOGO_HEIGHT,
  DEFAULT_LOGO_WIDTH,
  DEFAULT_LOGO_IMAGE,
} from '../shared/helpers';

const DisplayInfo = (props) => {
  const currentlyReading = props.cr;
  const currentUser = props.cu;
  const reviews = props.r;
  const books = props.b;
  const displayInfo = () => {
    const displayArray = [];
    if (currentlyReading.length > 0) {
      const mostRecentCurrentlyReading = currentlyReading[0];
      displayArray.push(
        <li className="list-group-item mt-5 border-0">
          <h6 className="lead">You're currently reading</h6>
          <Link to={`/details/${mostRecentCurrentlyReading.bookID}`}>
            {mostRecentCurrentlyReading.bookID}
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
    <>
      <div className="pt-3">
        <img
          src={DEFAULT_LOGO_IMAGE}
          alt=""
          width={DEFAULT_LOGO_WIDTH}
          height={DEFAULT_LOGO_HEIGHT}
        />
      </div>
      <ul className="list-group">{displayInfo().map((display) => display)}</ul>
    </>
  );
};

export default DisplayInfo;
