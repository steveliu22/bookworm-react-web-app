import React from 'react';
import { Link } from 'react-router-dom';
import Buttons from './buttons';
import { DEFAULT_LOGO_IMAGE, FetchImagePath } from '../shared/helpers';

const SearchResult = (book) => {
  const actualBook = book.book;
  let coverImage = DEFAULT_LOGO_IMAGE;
  if (actualBook.type === 'google-book') {
    coverImage = actualBook.coverImage;
  } else {
    coverImage = FetchImagePath(actualBook.coverImage);
  }

  let authorsFormatted = 'No authors found';
  if (actualBook.type === 'google-book') {
    authorsFormatted = actualBook.authors;
  } else {
    authorsFormatted = (
      <Link to={`/profile/${actualBook.authors._id}`}>
        {actualBook.authors.username}
      </Link>
    );
  }

  const isbnsFormatted = actualBook.isbn;

  const informationArray = [
    { title: 'Author(s)', info: authorsFormatted },
    { title: 'Description', info: actualBook.description },
    { title: 'Publisher', info: actualBook.publisher },
    { title: 'ISBN(s)', info: isbnsFormatted },
  ];
  return (
    <li className="list-group-item p-2 w-100 border rounded">
      <div className="row mx-auto">
        <div className="col-md-5 col-xxl-3 p-0 d-flex justify-content-center align-items-center">
          <img src={coverImage} alt="" className="img-fluid" width="100px" />
        </div>
        <div className="col-md-7 col-xxl-9 p-0">
          <div className="fw-bolder fs-4 text-primary text-start">
            <p className="p-0 small fs-5">{actualBook.title}</p>
          </div>
          {informationArray.map((info) => {
            return (
              <div className="pt-3 text-start p-0">
                <p className="small">
                  <span className="fw-bold text-primary">{info.title}: </span>
                  {info.info}
                </p>
              </div>
            );
          })}
          <div className="pt-3 justify-content-center">
            <Buttons book={book.book} />
          </div>
        </div>
      </div>
    </li>
  );
};

export default SearchResult;
