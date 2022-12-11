import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { findAllBookByIdThunk } from '../thunks/books-thunks';
import {
  DEFAULT_LOGO_IMAGE,
  NormalizeBookObject,
  FetchImagePath,
} from '../shared/helpers';
import NavigationSidebar from '../navigation/navigation';
import {
  createReviewThunk,
  findReviewsByBookThunk,
} from '../thunks/review-thunks';
import ReviewComponent from '../review';
import { findAllUsersCurrentlyReadingThunk } from '../thunks/currently-reading-thunks';
import UsersReading from './users-reading';

const BookDetails = () => {
  const [review, setReview] = useState('');
  const { currentUser } = useSelector((state) => state.users);
  const { reviews } = useSelector((state) => state.reviews);
  const { details } = useSelector((state) => state.books);
  const { usersCurrentlyReading } = useSelector(
    (state) => state.currentlyReading
  );
  const { bid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const postReviewBtn = () => {
    if (currentUser) {
      dispatch(createReviewThunk({ review, bookID: bid }));
      navigate(0);
    }
  };

  useEffect(() => {
    if (bid) {
      dispatch(findReviewsByBookThunk(bid));
      dispatch(findAllBookByIdThunk(bid));
      dispatch(findAllUsersCurrentlyReadingThunk(bid));
    }
  }, []);

  if (!details) return <h3>Loading ...</h3>;

  const actualBook = NormalizeBookObject(details);
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

  const { categories } = actualBook;

  return (
    <div className="p-5">
      <div className="row p-0">
        <div className="col-md-0 col-lg-2 p-0 pt-4">
          <NavigationSidebar />
          {currentUser && currentUser.role === 'REVIEWER' && (
            <div className="pt-5">
              <div>
                <textarea
                  id="review"
                  name="review"
                  className="w-100"
                  rows="10"
                  placeholder="Leave a review here"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
              </div>
              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={postReviewBtn}
                >
                  Post Review
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="col-md-0 col-lg-2 pe-4 ps-0 text-center pt-4">
          <img src={coverImage} alt="" className="img-fluid w-50" />
        </div>

        <div className="col-md-12 col-lg-6 p-0 pe-5 pt-4">
          <ul className="list-group">
            <li className="list-group-item border-0">
              <h2 className="fw-bolder fst-italic">{actualBook.title}</h2>
            </li>

            <li className="list-group-item border-0">
              <p className="fw-normal">
                <span className="fw-bolder">by </span>
                {authorsFormatted}
              </p>
            </li>

            <li className="text-start list-group-item border-0">
              <p className="fw-light">
                <span className="fw-bold">Description: </span>
                {actualBook.description}
              </p>
            </li>

            <li className="list-group-item border-0">
              <p className="fw-normal">
                <span className="fw-bolder">ISBN(s): </span>
                {actualBook.isbn}
              </p>
            </li>

            <li className="list-group-item border-0">
              <p className="fw-normal">
                <span className="fw-bolder">Publish Date: </span>
                {actualBook.publishDate}
              </p>
            </li>

            <li className="list-group-item border-0">
              <p className="fw-normal">
                <span className="fw-bolder">Publisher: </span>
                {actualBook.publisher}
              </p>
            </li>

            <li className="list-group-item border-0">
              <p className="fw-normal">
                <span className="fw-bolder">Categories: </span>
                {categories}
              </p>
            </li>

            <li className="list-group-item border-0">
              <p className="fw-normal">
                {usersCurrentlyReading.length > 0 ? (
                  <UsersReading currentlyReading={usersCurrentlyReading} />
                ) : (
                  <h6 className="lead">
                    Nobody is currently reading this book!
                  </h6>
                )}
              </p>
            </li>
          </ul>
        </div>

        <div className="pt-4">
          <div className="text-center">
            <h5>All Reviews for {actualBook.title}</h5>
          </div>
          <ReviewComponent reviews={reviews} />
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
