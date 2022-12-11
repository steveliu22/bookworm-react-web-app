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
        <li className="list-group-item mt-2 border-0">
          <Link
            className="text-decoration-none"
            to={`/details/${mostRecentCurrentlyReading.bookID}`}
          >
            <p className="display-7 small">
              What's {props.cu.username} been reading?
            </p>
          </Link>
        </li>
      );
    } else {
      displayArray.push(
        <li className="list-group-item mt-2 border-0">
          <p className="display-7 small">
            {props.cu.username} is not reading any books
          </p>
        </li>
      );
    }

    if (currentUser) {
      if (currentUser.role === 'AUTHOR') {
        if (books.length > 0) {
          const mostRecentBook = books[0];
          displayArray.push(
            <li className="list-group-item mt-2 border-0">
              <Link
                className="text-decoration-none"
                to={`/details/${mostRecentBook._id}`}
              >
                <p className="display-7 small">
                  What's {props.cu.username} been working on?
                </p>
              </Link>
            </li>
          );
        } else {
          displayArray.push(
            <li className="list-group-item mt-2 border-0">
              <p className="display-7 small">
                {props.cu.username} has added no books
              </p>
            </li>
          );
        }
      }

      if (currentUser.role === 'REVIEWER') {
        if (reviews.length > 0) {
          const mostRecentReview = reviews[0];
          displayArray.push(
            <li className="list-group-item mt-2 border-0">
              <Link
                className="text-decoration-none"
                to={`/details/${mostRecentReview.bookID}`}
              >
                <p className="display-7 small">
                  What's {props.cu.username} been reviewing?
                </p>
              </Link>
            </li>
          );
        } else {
          displayArray.push(
            <li className="list-group-item mt-2 border-0">
              <p className="display-7 small">
                {props.cu.username} is reviewing no books
              </p>
            </li>
          );
        }
      }
    }
    return displayArray;
  };

  return (
    <>
      <div className="pt-3 mb-2">
        <img
          src={DEFAULT_LOGO_IMAGE}
          alt=""
          width={DEFAULT_LOGO_WIDTH}
          height={DEFAULT_LOGO_HEIGHT}
        />
      </div>
      <ul className="list-group text-xxl-center text-xl-center text-lg-center text-md-center text-sm-center text-xs-center text-center">
        {displayInfo().map((display) => display)}
      </ul>
    </>
  );
};

export default DisplayInfo;
