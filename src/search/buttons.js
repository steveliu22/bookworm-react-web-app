import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  createCurrentlyReadingThunk,
  findUserCurrentlyReadingThunk,
} from '../thunks/currently-reading-thunks';

const Buttons = (book) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);
  const { currentlyReading } = useSelector((state) => state.currentlyReading);

  useEffect(() => {
    if (currentUser) {
      dispatch(findUserCurrentlyReadingThunk(currentUser._id));
    }
  }, []);

  const handleCurrentlyReadingBtn = () => {
    dispatch(createCurrentlyReadingThunk({ bookID: book.book.id }));
    toast.success(`Succesfully added ${book.book.title} to Currently Reading`);
  };

  const isCurrentlyReading = () => {
    if (currentlyReading) {
      const val = currentlyReading.find((reading) => {
        return reading.bookID === book.book.id;
      });

      return val !== undefined;
    }

    return false;
  };

  return (
    <div className="row text-center">
      <div className="col-sm-6 col-lg-4 p-1">
        <button
          type="button"
          className="btn btn-primary btn-block btn-sm"
          onClick={() => navigate(`/details/${book.book.id}`)}
        >
          See Details
        </button>
      </div>
      {currentUser && !isCurrentlyReading() && (
        <div className="col-sm-6 col-lg-4 p-1">
          <button
            type="button"
            className="btn btn-success btn-block btn-sm"
            onClick={handleCurrentlyReadingBtn}
          >
            Add to Currently Reading
          </button>
        </div>
      )}
    </div>
  );
};

export default Buttons;
