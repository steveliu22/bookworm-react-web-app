import React from 'react';
import Buttons from './buttons';
import { DEFAULT_LOGO_IMAGE, FormatArrayTexts } from '../shared/helpers';

const SearchResult = (book) => {
  const bookVolume = book.book.volumeInfo;
  let coverImage = DEFAULT_LOGO_IMAGE;
  if (bookVolume.imageLinks) {
    if ('thumbnail' in bookVolume.imageLinks) {
      coverImage = bookVolume.imageLinks.thumbnail;
    }
  }
  const authorsFormatted = FormatArrayTexts(
    bookVolume.authors,
    'No authors found'
  );

  let isbnsFormatted = '';
  if (bookVolume.industryIdentifiers) {
    isbnsFormatted = FormatArrayTexts(
      bookVolume.industryIdentifiers.map((isbn) => isbn.identifier),
      'No ISBNs found'
    );
  }

  const informationArray = [
    { title: 'Author(s)', info: authorsFormatted },
    { title: 'Description', info: bookVolume.description },
    { title: 'Publisher', info: bookVolume.publisher },
    { title: 'ISBN(s)', info: isbnsFormatted },
  ];
  return (
    <li className="list-group-item p-5 w-100 border">
      <div className="row mx-auto">
        <div className="col-md-5 col-xxl-3 p-0 d-flex justify-content-center align-items-center">
          <img src={coverImage} alt="" className="img-fluid" width="100px" />
        </div>
        <div className="col-md-7 col-xxl-9 p-0">
          <div className="fw-bolder fs-4 text-primary">{bookVolume.title}</div>
          {informationArray.map((info) => {
            return (
              <div className="pt-3 text-start p-0">
                <p className="fs-6">
                  <span className="fw-bold text-primary">{info.title}:</span>{' '}
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
