import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { NormalizeBookObject } from '../shared/helpers';
import { deleteReviewThunk } from '../thunks/review-thunks';
import SingleReview from './single-review';

const UserReviews = (props) => {
  const actualReviews = props.reviews;
  const actualBooks = props.books;
  const notHideBtn = props.hide;
  const dispatch = useDispatch();
  const handleDeleteBtn = async (review) => {
    await dispatch(deleteReviewThunk(review._id));
  };
  const normalizeBooks = () => {
    if (actualBooks) {
      if (actualBooks.length > 0) {
        return actualBooks.map((book) => (
          <SingleReview book={NormalizeBookObject(book)} />
        ));
      }
    }

    return [];
  };
  return (
    <div>
      <ul className="list-group pt-4">
        {actualReviews.map((review, idx) => {
          return (
            <li key={idx} className="list-group pb-4">
              <div className="row">
                <div className="col-5">
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
                {notHideBtn && (
                  <div className="col-md-2 col-xxl-3">
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={async () => await handleDeleteBtn(review)}
                    >
                      Delete Review
                    </button>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserReviews;
