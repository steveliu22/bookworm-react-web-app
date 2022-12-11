import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserReviews from './user-reviews';
import UserCurrentlyReading from './user-currently-reading';
import { findAllBooksByIdThunk } from '../thunks/books-thunks';

const UserReviewerCurrentlyReading = (props) => {
  const actualBooks = props.books;
  const actualReviews = props.reviews;
  const actualCurrentlyReading = props.currentlyReading;
  const actualUser = props.user;
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.books);
  useEffect(() => {
    if (actualBooks && actualBooks.length > 0) {
      dispatch(findAllBooksByIdThunk(actualBooks));
    }
  }, [actualBooks]);

  const reviewsHeader = () => {
    if (actualUser) {
      return `${actualUser.username}'s Reviews`;
    }

    return 'My Reviews';
  };

  const currentlyReadingHeader = () => {
    if (actualUser) {
      return `${actualUser.username} is currently reading...`;
    }

    return "I'm currently reading..";
  };

  const parseBooks = () => {
    const reviewBooks = [];
    const currentlyReadingBooks = [];
    if (books.length > 0) {
      for (let i = 0; i < books.length; i += 1) {
        const book = books[i];

        if (JSON.stringify(book) === JSON.stringify({})) {
          continue;
        }

        if (i >= actualReviews.length) {
          currentlyReadingBooks.push(book);
        } else {
          reviewBooks.push(book);
        }
      }
    }
    return [reviewBooks, currentlyReadingBooks];
  };

  const reviewBooks = parseBooks()[0];
  const currentlyReadingBooks = parseBooks()[1];
  return (
    <div className="pt-3">
      <div className="text-center">
        <h6>{reviewsHeader()}</h6>
      </div>
      <div>
        {actualReviews.length > 0 ? (
          <UserReviews
            reviews={actualReviews}
            books={reviewBooks}
            hide={actualUser === undefined}
          />
        ) : (
          <h6>Can't find any reviews...</h6>
        )}
      </div>
      <div className="pt-3">
        <h6 className="text-center">{currentlyReadingHeader()}</h6>
        <div>
          {actualCurrentlyReading.length > 0 ? (
            <UserCurrentlyReading
              currentlyReading={actualCurrentlyReading}
              books={currentlyReadingBooks}
              hide={actualUser === undefined}
            />
          ) : (
            <h5>Can't find any books...</h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserReviewerCurrentlyReading;
