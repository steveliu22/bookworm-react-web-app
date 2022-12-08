import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SearchResult from './search-result';
import SearchComponent from '.';
import { findAllBooksBySearchThunk } from '../thunks/books-thunks';
import { NormalizeBookObject } from '../shared/helpers';

const SearchResults = () => {
  const dispatch = useDispatch();
  const { query } = useParams();
  const { books } = useSelector((state) => state.books);
  const bookMapFunc = (book) => {
    const normalized = NormalizeBookObject(book);
    return <SearchResult key={normalized.id} book={normalized} />;
  };
  useEffect(() => {
    dispatch(findAllBooksBySearchThunk(query));
  }, []);
  return (
    <>
      <SearchComponent />
      <ul className="p-5">{books.map(bookMapFunc)}</ul>
    </>
  );
};

export default SearchResults;
