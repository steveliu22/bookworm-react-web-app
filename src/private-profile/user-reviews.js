import React from 'react';
import { useDispatch } from 'react-redux';
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

  const allBooks = normalizeBooks();
  return (
    <>
      <ul className="list-group">
        {actualReviews.map((review, idx) => {
          return (
            <li className="list-group-item p-0 mb-2 ps-2 pe-2 border rounded text-decoration-none">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 border-0 border-end">
                  {allBooks[idx]}
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 mb-2 pt-1 text-center">
                  <span className="fw-bold">Review:</span>{' '}
                  <p className="text-start small">{review.review}</p>
                  {notHideBtn && (
                    <div className="text-center">
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
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default UserReviews;
