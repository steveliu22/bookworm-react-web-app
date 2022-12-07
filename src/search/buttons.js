import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createCurrentlyReadingThunk } from '../thunks/currently-reading-thunks';

const Buttons = (book) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCurrentlyReadingBtn = () => {
    dispatch(createCurrentlyReadingThunk({ bookID: book.book.id }));
  };
  return (
    <div className="row text-center">
      <div className="col-lg-4 p-1">
        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={() => navigate(`/details/${book.book.id}`)}
        >
          Leave a Review
        </button>
      </div>
      <div className="col-lg-4 p-1">
        <button
          type="button"
          className="btn btn-success btn-block"
          onClick={handleCurrentlyReadingBtn}
        >
          Add to Currently Reading
        </button>
      </div>
      <div className="col-lg-4 p-1">
        <button type="button" className="btn btn-info">
          Add to Favorites
        </button>
      </div>
    </div>
  );
};

export default Buttons;
