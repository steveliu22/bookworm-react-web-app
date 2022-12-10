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
    <li className="list-group-item p-2 mb-2 w-100 border rounded text-decoration-none">
      <div className="row">
        <div className="col-md-5 col-xxl-3 p-5 text-center">
          <Link to={`/details/${actualBook.id}`}>
            <img
              src={coverImage}
              alt=""
              className="img-fluid"
              width={DEFAULT_LOGO_WIDTH}
              height={DEFAULT_LOGO_HEIGHT}
            />
          </Link>
        </div>

        <div className="col-md-7 col-xxl-9 text-center my-auto">
          <div className="fw-bolder fs-4 text-primary">
            <p className="small display-7 lead">
              <span className="fw-bold small">Title: </span> {actualBook.title}
            </p>
            <p className="small display-7 lead p-0">
              <span className="fw-bold small">Description: </span>
              {actualBook.description}
            </p>
          </div>
          {notHideBtn && (
            <div className="p-0 justify-content-center">
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
