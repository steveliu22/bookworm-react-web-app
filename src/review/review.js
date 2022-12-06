import React from 'react';

const SingleReviewComponent = (review) => {
  return (
    <li className="list-group-item border-0 p-0 pb-4">
      <div className="row">
        <div className="col-md-12 col-lg-3">{review.review.user.username}</div>
        <div className="col-md-12 col-lg-9">{review.review.review}</div>
      </div>
    </li>
  );
};

export default SingleReviewComponent;
