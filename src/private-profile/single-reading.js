import React from 'react';
import {
  DEFAULT_LOGO_HEIGHT,
  DEFAULT_LOGO_IMAGE,
  DEFAULT_LOGO_WIDTH,
  FetchImagePath,
} from '../shared/helpers';

const SingleReading = (book) => {
  const actualBook = book.book;
  let coverImage = DEFAULT_LOGO_IMAGE;
  if (actualBook.type === 'google-book') {
    coverImage = actualBook.coverImage;
  } else {
    coverImage = FetchImagePath(actualBook.coverImage);
  }
  return (
    <li className="list-group-item border-0">
      <div className="row">
        <div className="d-none d-md-block col-lg-4 col-xl-3 p-0 text-center">
          <img
            src={coverImage}
            alt=""
            className="img-fluid"
            width={DEFAULT_LOGO_WIDTH}
            height={DEFAULT_LOGO_HEIGHT}
          />
        </div>
        <div className="col-md-12 col-lg-8 text-start my-auto">
          <div className="fw-bolder text-primary text-center small">
            {actualBook.title}
          </div>
        </div>
      </div>
    </li>
  );
};

export default SingleReading;
