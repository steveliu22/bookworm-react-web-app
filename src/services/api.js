export const BASE_URL =
  process.env.REACT_APP_API_BASE || 'http://localhost:4000';

// export const BASE_URL = 'http://localhost:4000';

export const REVIEWS_API = `${BASE_URL}/reviews`;

export const GOOGLE_BOOK_API = 'https://www.googleapis.com/books/v1';

export const GOOGLE_BOOK_SEARCH_API = (search) =>
  `${GOOGLE_BOOK_API}/volumes?q=${search}&maxResults=40`;

export const GOOGLE_BOOK_ID_FIND_API = (bid) =>
  `${GOOGLE_BOOK_API}/volumes/${bid}`;
