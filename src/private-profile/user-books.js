import React from 'react';
import { NormalizeBookObject } from '../shared/helpers';
import UserBook from './user-book';

const UserBooks = (props) => {
  const actualBooks = props.books;
  const notHideBtn = props.hide;
  const bookMapFunc = (book) => {
    const normalized = NormalizeBookObject(book);
    return <UserBook key={normalized.id} book={normalized} hide={notHideBtn} />;
  };
  return (
    <>
      <ul className="list-group p-0">{actualBooks.map(bookMapFunc)}</ul>
    </>
  );
};

export default UserBooks;
