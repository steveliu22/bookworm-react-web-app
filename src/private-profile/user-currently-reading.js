import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { NormalizeBookObject } from '../shared/helpers';
import SingleReading from './single-reading';
import { deleteCurrentlyReadingThunk } from '../thunks/currently-reading-thunks';

const UserCurrentlyReading = (props) => {
  const actualCurrentlyReading = props.currentlyReading;
  const actualBooks = props.books;
  const notHideBtn = props.hide;
  const dispatch = useDispatch();
  const deleteOnClick = async (cr) => {
    await dispatch(deleteCurrentlyReadingThunk(cr._id));
  };

  const normalizeBooks = () => {
    if (actualBooks) {
      if (actualBooks.length > 0) {
        return actualBooks.map((book) => (
          <SingleReading
            className="border-0"
            book={NormalizeBookObject(book)}
          />
        ));
      }
    }
    return [];
  };

  return (
    <div>
      <ul className="list-group pt-4">
        {actualCurrentlyReading.map((reading, idx) => {
          return (
            <li key={reading._id} className="list-group pb-4">
              <div className="row">
                <div className="col-xxl-9">
                  <Link
                    className="text-decoration-none"
                    to={`/details/${reading.bookID}`}
                  >
                    {normalizeBooks()[idx]}
                  </Link>
                </div>
                {notHideBtn && (
                  <div className="col-md-3 col-xxl-3">
                    <button
                      type="button"
                      className="btn btn-danger btn-sm small"
                      onClick={async () => {
                        await deleteOnClick(reading);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserCurrentlyReading;
