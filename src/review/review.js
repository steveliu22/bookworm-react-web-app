import React from 'react';
import { FetchImagePath } from '../shared/helpers';

const SingleReviewComponent = (review) => {
  return (
    <li className="list-group-item border-0 p-0 pt-5 pb-5 bg-light">
      <div className="row">
        <div className="col-md-4 col-lg-2">
          <div className="row">
            <div className="col-4 p-0 text-center">
              <img
                src={FetchImagePath(review.review.user.profilePicture)}
                alt=""
                className="w-50"
              />
            </div>
            <div className="col-8 p-0 d-flex align-items-center">
              <h5 className="fw-bolder">{review.review.user.username}</h5>
            </div>
          </div>
        </div>
        <div className="col-md-8 col-lg-6">{review.review.review}</div>
      </div>
    </li>
  );
};

export default SingleReviewComponent;
