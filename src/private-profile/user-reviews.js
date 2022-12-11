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
                <div className="col-sm-12 col-lg-4 mb-5 text-start">
                  {allBooks[idx]}
                </div>
                <div className="col-md-12 col-lg-8 mb-5 pt-3">
                  <p className="text-start small">{review.review}</p>
                </div>
                {notHideBtn && (
                  <div className="position-absolute bottom-0 pb-2">
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
    </>
  );
};

export default UserReviews;
