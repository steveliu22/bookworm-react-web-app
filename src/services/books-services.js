import axios from 'axios';
import { findBookById } from './google-books-services';
import { BASE_URL } from './api';

const session = axios.create({ withCredentials: true });

export const findAllBookById = async (bid) => {
  const googleBook = await findBookById(bid);

  if (googleBook === undefined) {
    const dbBook = await session.get(`${BASE_URL}/books/${bid}`);
    return dbBook.data;
  }

  return googleBook;
};

export const findAllBooksById = async (bids) => {
  const data = [];
  for (let i = 0; i < bids.length; i += 1) {
    const response = await findAllBookById(bids[i]);
    data.push(response);
  }

  return data;
};
