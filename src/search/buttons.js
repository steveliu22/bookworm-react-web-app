import React from 'react';
import { useNavigate } from 'react-router-dom';

const Buttons = (book) => {
  const navigate = useNavigate();
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
        <button type="button" className="btn btn-success btn-block">
          Add to Read Later
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
