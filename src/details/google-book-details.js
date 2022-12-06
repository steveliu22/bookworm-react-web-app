import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { findBookByIdThunk } from '../thunks/google-books-thunks';
import { DEFAULT_LOGO_IMAGE, FormatArrayTexts } from '../shared/helpers';
import NavigationSidebar from '../navigation/navigation';
import {
  createReviewThunk,
  findReviewsByBookThunk,
} from '../thunks/review-thunks';
import ReviewComponent from '../review';

const GoogleBookDetails = () => {
  const [review, setReview] = useState('');
  const { currentUser } = useSelector((state) => state.users);
  const { reviews } = useSelector((state) => state.reviews);
  const { bid } = useParams();
  const dispatch = useDispatch();
  const postReviewBtn = () => {
    if (currentUser) {
      dispatch(createReviewThunk({ review, bookID: bid }));
    }
  };
  useEffect(() => {
    dispatch(findBookByIdThunk(bid));
    dispatch(findReviewsByBookThunk(bid));
  }, [bid, reviews]);
  const { details } = useSelector((state) => state.googleBooks);

  if (!details) return <h3>Loading ...</h3>;

  const volInfo = details.volumeInfo;

  let coverImage = DEFAULT_LOGO_IMAGE;

  if (volInfo.imageLinks) {
    if ('thumbnail' in volInfo.imageLinks) {
      coverImage = volInfo.imageLinks.thumbnail;
    }
  }

  const authorsFormatted = FormatArrayTexts(
    volInfo.authors,
    'No authors found'
  );

  let isbnsFormatted = '';
  if (volInfo.industryIdentifiers) {
    isbnsFormatted = FormatArrayTexts(
      volInfo.industryIdentifiers.map((isbn) => isbn.identifier),
      'No ISBNs found'
    );
  }

  let categories = '';
  if (volInfo.categories) {
    categories = FormatArrayTexts(volInfo.categories, 'No Categories Found');
  }

  return (
    <div className="p-5">
      <div className="row p-0">
        <div className="col-md-0 col-lg-2 p-0 pt-4">
          <NavigationSidebar />
          {currentUser && (
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
              <h2 className="fw-bolder fst-italic">{volInfo.title}</h2>
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
                {volInfo.description}
              </p>
            </li>

            <li className="list-group-item border-0">
              <p className="fw-normal">
                <span className="fw-bolder">ISBN(s): </span>
                {isbnsFormatted}
              </p>
            </li>

            <li className="list-group-item border-0">
              <p className="fw-normal">
                <span className="fw-bolder">Page Count: </span>
                {volInfo.pageCount}
              </p>
            </li>

            <li className="list-group-item border-0">
              <p className="fw-normal">
                <span className="fw-bolder">Publish Date: </span>
                {volInfo.publishedDate}
              </p>
            </li>

            <li className="list-group-item border-0">
              <p className="fw-normal">
                <span className="fw-bolder">Publisher: </span>
                {volInfo.publisher}
              </p>
            </li>

            <li className="list-group-item border-0">
              <p className="fw-normal">
                <span className="fw-bolder">Categories: </span>
                {categories}
              </p>
            </li>
          </ul>
        </div>

        <div className="pt-5">
          <div className="text-center">
            <h5>All User Reviews</h5>
          </div>
          <ReviewComponent reviews={reviews} />
        </div>
      </div>
    </div>
  );
};

export default GoogleBookDetails;
