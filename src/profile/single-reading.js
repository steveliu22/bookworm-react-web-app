import React from 'react';
import { DEFAULT_LOGO_IMAGE, FetchImagePath } from '../shared/helpers';

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
        <div className="col-md-5 col-xxl-4 p-0 d-flex justify-content-center align-items-center">
          <img src={coverImage} alt="" className="img-fluid" width="40px" />
        </div>
        <div className="col-md-5 col-xxl-8 text-end">
          <div className="fw-bolder text-primary text-center small">
            {actualBook.title}
          </div>
        </div>
      </div>
    </li>
  );
};

export default SingleReading;
