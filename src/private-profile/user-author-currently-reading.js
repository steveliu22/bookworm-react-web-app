import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserBooks from './user-books';
import UserCurrentlyReading from './user-currently-reading';
import { findAllBooksByIdThunk2 } from '../thunks/books-thunks';

const UserAuthorCurrentlyReading = (props) => {
  const actualBooks = props.books;
  const actualCurrentlyReading = props.currentlyReading;
  const actualUser = props.user;
  const dispatch = useDispatch();
  const { authorBooks } = useSelector((state) => state.books);
  useEffect(() => {
    if (actualCurrentlyReading && actualCurrentlyReading.length > 0) {
      dispatch(
        findAllBooksByIdThunk2(actualCurrentlyReading.map((cr) => cr.bookID))
      );
    }
  }, [actualCurrentlyReading]);

  const booksHeader = () => {
    if (actualUser) {
      return `${actualUser.username}'s Books`;
    }

    return 'My Books';
  };

  const currentlyReadingHeader = () => {
    if (actualUser) {
      return `${actualUser.username} is currently reading...`;
    }

    return "I'm currently reading..";
  };

  return (
    <div className="pt-3">
      <div className="text-center">
        <h6>{booksHeader()}</h6>
      </div>
      <div className="border-bottom">
        {actualBooks.length > 0 ? (
          <UserBooks books={actualBooks} hide={actualUser === undefined} />
        ) : (
          <h6>Can't find any books...</h6>
        )}
      </div>
      <div className="pt-3">
        <h6 className="text-center">{currentlyReadingHeader()}</h6>
        <div>
          {actualCurrentlyReading.length > 0 ? (
            <UserCurrentlyReading
              currentlyReading={actualCurrentlyReading}
              books={authorBooks}
              hide={actualUser === undefined}
            />
          ) : (
            <h6>Can't find any books...</h6>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAuthorCurrentlyReading;
