import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FetchImagePath } from '../shared/helpers';
import NavigationSidebar from '../navigation/navigation';
import { findAllBooksByAuthorThunk } from '../thunks/books-thunks';
import PersonalInformationComponent from './personal-information';

const AuthorProfile = () => {
  const { currentUser } = useSelector((state) => state.users);
  const { books } = useSelector((state) => state.books);
  const { currentlyReading } = useSelector((state) => state.currentlyReading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(findAllBooksByAuthorThunk(currentUser._id));
  }, []);
  console.log(books);
  return (
    <div className="p-5">
      <div className="row">
        <div className="col-2">
          <NavigationSidebar />
        </div>
        <div className="col-7 border p-5 rounded">
          <div className="row">
            <div className="col-3">
              <img
                src={FetchImagePath(currentUser.profilePicture)}
                alt=""
                className="w-75"
              />
            </div>

            <div className="col-9">
              <div>
                <h5>{currentUser.username} is the Author of</h5>
                <ul className="list-group pt-4">
                  {books.map((book, idx) => {
                    return (
                      <li key={idx} className="list-group pb-4">
                        <div className="row">
                          <div className="col-3">
                            <Link
                              className="text-decoration-none"
                              to={`/details/${book._id}`}
                            >
                              <p className="fs-6 lead">{book.title}</p>
                            </Link>
                            <img
                              src={FetchImagePath(book.coverImage)}
                              alt=""
                              className="w-25"
                            />
                          </div>
                          <div className="col-9">{book.description}</div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="pt-5">
                <h5>{currentUser.username} is currently reading...</h5>
                <ul className="list-group pt-4">
                  {currentlyReading.map((read) => {
                    return (
                      <li key={read._id} className="list-group pb-4">
                        <div className="row">
                          <div className="col-3">
                            <Link
                              className="text-decoration-none"
                              to={`/details/${read.bookID}`}
                            >
                              <p className="fs-6 lead">{read.bookID}</p>
                            </Link>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-3">
          <PersonalInformationComponent />
          <div className="pt-2 text-center">
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => navigate('/publish')}
            >
              Add a Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile;
