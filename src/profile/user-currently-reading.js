import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { NormalizeBookObject } from '../shared/helpers';
import { findAllBooksByIdThunk } from '../thunks/books-thunks';
import SingleReading from './single-reading';

const UserCurrentlyReading = (currentlyReading) => {
  const actualCurrentlyReading = currentlyReading.currentlyReading;
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.books);
  useEffect(() => {
    if (actualCurrentlyReading) {
      dispatch(
        findAllBooksByIdThunk(
          actualCurrentlyReading.map((reading) => reading.bookID)
        )
      );
    }
  }, [currentlyReading]);

  const normalizeBooks = () => {
    if (books.length > 0) {
      return books.map((book) => (
        <SingleReading className="border-0" book={NormalizeBookObject(book)} />
      ));
    }

    return [];
  };
  return (
    <div>
      <ul className="list-group pt-4">
        {actualCurrentlyReading.map((reading, idx) => {
          return (
            <li key={reading._id} className="list-group pb-4">
              <div>
                <Link
                  className="text-decoration-none"
                  to={`/details/${reading.bookID}`}
                >
                  {normalizeBooks()[idx]}
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserCurrentlyReading;
