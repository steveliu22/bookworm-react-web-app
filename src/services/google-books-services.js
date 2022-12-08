import axios from 'axios';
import { GOOGLE_BOOK_SEARCH_API, GOOGLE_BOOK_ID_FIND_API } from './api';

export const findBooksBySearchTerm = async (search) => {
  const response = await axios.get(GOOGLE_BOOK_SEARCH_API(search));
  return response.data.items;
};

export const findBookById = async (bid) => {
  const response = await axios
    .get(GOOGLE_BOOK_ID_FIND_API(bid))
    .catch((err) => {
      return err.response;
    });
  return response.data;
};
