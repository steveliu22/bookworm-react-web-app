export const BASE_URL = process.env.BOOKWORM_API_BASE_URL;

console.log(BASE_URL);

export const REVIEWS_API = `${BASE_URL}/reviews`;

export const GOOGLE_BOOK_API = 'https://www.googleapis.com/books/v1';

export const GOOGLE_BOOK_SEARCH_API = (search) =>
  `${GOOGLE_BOOK_API}/volumes?q=${search}&maxResults=40`;

export const GOOGLE_BOOK_ID_FIND_API = (bid) =>
  `${GOOGLE_BOOK_API}/volumes/${bid}`;
