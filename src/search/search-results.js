import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SearchResult from './search-result';
import SearchComponent from '.';
import { findBooksBySearchTermThunk } from '../thunks/google-books-thunks';

const SearchResults = () => {
  const dispatch = useDispatch();
  const { query } = useParams();
  const { books } = useSelector((state) => state.googleBooks);

  useEffect(() => {
    dispatch(findBooksBySearchTermThunk(query));
  }, []);
  return (
    <>
      <SearchComponent />
      <ul className="p-5">
        {books.map((book) => (
          <SearchResult key={book.id} book={book} />
        ))}
      </ul>
    </>
  );
};

export default SearchResults;
