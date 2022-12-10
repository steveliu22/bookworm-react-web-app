import React from 'react';
import { Link } from 'react-router-dom';
import {
  DEFAULT_LOGO_HEIGHT,
  FetchImagePath,
  DEFAULT_LOGO_WIDTH,
} from '../shared/helpers';

const SingleReviewComponent = (review) => {
  return (
    <li className="list-group-item border-0 p-0 p-2 mb-2 bg-light">
      <div className="row">
        <div className="col-sm-12 col-lg-2 ps-4 pb-2">
          <div className="row text-center">
            <div className="col-sm-6 col-lg-3 pe-5 text-end">
              <img
                src={FetchImagePath(review.review.user.profilePicture)}
                alt=""
                width={DEFAULT_LOGO_WIDTH - 25}
                height={DEFAULT_LOGO_HEIGHT - 25}
              />
            </div>
            <div className="col-sm-6 col-lg-9 ps-2 text-start">
              <Link
                className="text-decoration-none"
                to={`/profile/${review.review.user._id}`}
              >
                <p className="fw-bolder lead">{review.review.user.username}</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-lg-10 h6">{review.review.review}</div>
      </div>
    </li>
  );
};

export default SingleReviewComponent;
