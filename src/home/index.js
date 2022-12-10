import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavigationSidebar from '../navigation/navigation';
import SearchResult from '../search/search-result';
import {
  NormalizeBookObject,
  DEFAULT_LOGO_HEIGHT,
  DEFAULT_LOGO_IMAGE,
  DEFAULT_LOGO_WIDTH,
} from '../shared/helpers';
import {
  findAllBooksByAuthorThunk,
  findRandomBookThunk,
} from '../thunks/books-thunks';
import { findUserCurrentlyReadingThunk } from '../thunks/currently-reading-thunks';
import { findReviewsByAuthorThunk } from '../thunks/review-thunks';
import DisplayInfo from './display-info';

const HomeComponent = () => {
  const { currentUser } = useSelector((state) => state.users);
  const { details } = useSelector((state) => state.books);
  const { reviews } = useSelector((state) => state.reviews);
  const { currentlyReading } = useSelector((state) => state.currentlyReading);
  const { books } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findRandomBookThunk());
    if (currentUser) {
      dispatch(findReviewsByAuthorThunk(currentUser._id));
      if (currentUser.role === 'AUTHOR') {
        dispatch(findAllBooksByAuthorThunk(currentUser._id));
      } else {
        dispatch(findUserCurrentlyReadingThunk(currentUser._id));
      }
    }
  }, [currentUser]);

  return (
    <div className="p-5">
      <div className="row">
        <div className="col-md-4 col-lg-2">
          <NavigationSidebar />
        </div>
        <div className="col-md-6 col-lg-8 pt-0 pb-0 p-5 text-center mt-4">
          <div>
            <p className="lead display-6">Welcome to Bookworm!</p>
          </div>
          <div>
            <p className="lead display-7">
              Your free online book review website
            </p>
          </div>
          <div>
            <div className="p-0">
              <p className="text-start fw-bold text-success">
                Your randomly picked book!
              </p>
              <div className="p-0">
                {details === '' ? (
                  <h1>Loading..</h1>
                ) : (
                  <SearchResult book={NormalizeBookObject(details)} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-2 col-lg-2 p-0 text-center border rounded h-75 p-3 mt-4">
          {currentUser ? (
            <DisplayInfo
              cr={currentlyReading}
              cu={currentUser}
              r={reviews}
              b={books}
            />
          ) : (
            <ul className="list-group p-0">
              <li className="list-group-item border-0 mt-0">
                <div className="mb-4">
                  <img
                    src={DEFAULT_LOGO_IMAGE}
                    alt=""
                    width={DEFAULT_LOGO_WIDTH}
                    height={DEFAULT_LOGO_HEIGHT}
                  />
                </div>
                <p className="lead display-7">
                  Login or register for the full experience!
                </p>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
