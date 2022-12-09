import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { NormalizeBookObject } from '../shared/helpers';
import { findAllBooksByIdThunk } from '../thunks/books-thunks';
import SingleReview from './single-review';

const UserReviews = (reviews) => {
  const actualReviews = reviews.reviews;
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.books);
  useEffect(() => {
    if (actualReviews) {
      dispatch(
        findAllBooksByIdThunk(actualReviews.map((review) => review.bookID))
      );
    }
  }, [reviews]);

  const normalizeBooks = () => {
    if (books.length > 0) {
      return books.map((book) => (
        <SingleReview book={NormalizeBookObject(book)} />
      ));
    }

    return [];
  };
  return (
    <div>
      <ul className="list-group pt-4">
        {actualReviews.map((review, idx) => {
          return (
            <li key={review.review} className="list-group pb-4">
              <div className="row">
                <div className="col-6">
                  <Link
                    className="text-decoration-none"
                    to={`/details/${review.bookID}`}
                  >
                    {normalizeBooks()[idx]}
                  </Link>
                </div>
                <div className="col-4">
                  <p className="text-start small">{review.review}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserReviews;
