import React from 'react';
import SingleReviewComponent from './review';

const ReviewComponent = (reviews) => {
  return (
    <ul className="list-group">
      {reviews.reviews.map((review) => (
        <SingleReviewComponent key={review.id} review={review} />
      ))}
    </ul>
  );
};

export default ReviewComponent;
