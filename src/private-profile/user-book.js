import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  DEFAULT_LOGO_HEIGHT,
  DEFAULT_LOGO_IMAGE,
  DEFAULT_LOGO_WIDTH,
  FetchImagePath,
} from '../shared/helpers';
import { deleteBookThunk } from '../thunks/books-thunks';

const UserBook = (props) => {
  const actualBook = props.book;
  const notHideBtn = props.hide;
  const dispatch = useDispatch();
  const handleDeleteBtn = async () => {
    await dispatch(deleteBookThunk(actualBook.id));
  };
  let coverImage = DEFAULT_LOGO_IMAGE;
  if (actualBook.type === 'google-book') {
    coverImage = actualBook.coverImage;
  } else {
    coverImage = FetchImagePath(actualBook.coverImage);
  }
  return (
    <li className="list-group-item pt-2 ps-2 pe-2 mb-2 w-100 border rounded text-decoration-none">
      <div className="row">
        <div className="col-sm-12 col-md-3 col-xxl-2 p-4 pb-3 text-start">
          <Link to={`/details/${actualBook.id}`}>
            <img
              src={coverImage}
              alt=""
              width={DEFAULT_LOGO_WIDTH}
              height={DEFAULT_LOGO_HEIGHT}
            />
          </Link>
        </div>

        <div className="col-sm-12 col-md-9 col-xxl-10">
          <div className="fw-bolder text-dark pb-5">
            <div className="text-sm-right text-start h6 display-7 small fw-normal">
              <span className="fw-bold h6 display-7 text-primary">Title: </span>
              {actualBook.title}
            </div>
            <div className="d-none d-sm-block text-start h6 display-7 small text-dark fw-normal">
              <span className="fw-bold h6 display-7 text-primary">
                Description:{' '}
              </span>
              {actualBook.description}
            </div>
          </div>
          {notHideBtn && (
            <div className="position-absolute bottom-0 pb-1">
              <button
                type="button"
                className="btn btn-sm btn-danger"
                onClick={async () => await handleDeleteBtn()}
              >
                Delete Book
              </button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default UserBook;
