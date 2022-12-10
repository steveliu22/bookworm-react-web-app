import axios from 'axios';
import { findBookById, findBooksBySearchTerm } from './google-books-services';
import { BASE_URL } from './api';

const session = axios.create({ withCredentials: true });

export const findAllBookById = async (bid) => {
  const googleBook = await findBookById(bid);

  if (googleBook === undefined || googleBook.error !== undefined) {
    const dbBook = await session.get(`${BASE_URL}/books/${bid}`);
    const response = dbBook.data;
    if (response.length !== 0) {
      return dbBook.data[0];
    }
    return {};
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

export const findAllBooksByAuthor = async (uid) => {
  const response = await session.get(`${BASE_URL}/users/books/${uid}`);
  return response.data;
};

export const createBook = async (book) => {
  const response = await session.post(`${BASE_URL}/books`, book);
  return response.data;
};

export const findAllBooksBySearch = async (search) => {
  const googleBooks = await findBooksBySearchTerm(search);
  const dbBooks = await session.get(`${BASE_URL}/books/search/${search}`);
  const dbBooksData = dbBooks.data;
  const allBooks = [...dbBooksData, ...googleBooks];
  return allBooks;
};

export const findRandomBook = async () => {
  const search = await axios.get(`https://random-word-api.herokuapp.com/word`);
  const { data } = search;
  const booksRelatedToSearch = await findAllBooksBySearch(data);
  const randomNumber = Math.floor(Math.random() * booksRelatedToSearch.length);
  return booksRelatedToSearch[randomNumber];
};

export const deleteBook = async (bid) => {
  await session.delete(`${BASE_URL}/books/${bid}`);
  return bid;
};
