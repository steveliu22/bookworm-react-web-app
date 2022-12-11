import React from 'react';
import { Link } from 'react-router-dom';
import {
  DEFAULT_LOGO_HEIGHT,
  DEFAULT_LOGO_WIDTH,
  DEFAULT_LOGO_IMAGE,
  FetchImagePath,
} from '../shared/helpers';

const SingleReview = (book) => {
  const actualBook = book.book;
  let coverImage = DEFAULT_LOGO_IMAGE;
  if (actualBook.type === 'google-book') {
    coverImage = actualBook.coverImage;
  } else {
    coverImage = FetchImagePath(actualBook.coverImage);
  }
  return (
    <div className="row">
      <div className="col-sm-4 col-md-5 col-lg-6 col-xxl-4 p-1 text-start text-center">
        <Link to={`/details/${actualBook.id}`}>
          <img
            src={coverImage}
            alt=""
            width={DEFAULT_LOGO_WIDTH + 15}
            height={DEFAULT_LOGO_HEIGHT + 15}
          />
        </Link>
      </div>
      <div className="col-sm-8 col-md-7 col-lg-6 col-xxl-8 p-2 my-auto">
        <div className="d-none d-sm-block text-sm-right text-start h6 display-7 small text-start">
          {actualBook.title}
        </div>
      </div>
    </div>
  );
};

export default SingleReview;
