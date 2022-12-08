import { BASE_URL } from '../services/api';

export const GenerateRandomISBN = () => {
  const firstPart = Math.floor(Math.random() * 1000);
  const secondPart = Math.floor(Math.random() * 10);
  const thirdPart = Math.floor(Math.random() * 10000);
  const fourthPart = Math.floor(Math.random() * 10000);
  const lastPart = Math.floor(Math.random() * 10);

  return `${firstPart.toString()}-${secondPart.toString()}-${thirdPart.toString()}-${fourthPart.toString()}-${lastPart.toString()}`;
};

export const FormatArrayTexts = (texts, defaultMsg) => {
  let formatted = '';
  if (texts) {
    if (texts.length === 0) {
      formatted = defaultMsg;
    }
    for (let i = 0; i < texts.length; i += 1) {
      if (i === texts.length - 1) {
        formatted += texts[i];
      } else {
        formatted += `${texts[i]}, `;
      }
    }
  } else {
    formatted = defaultMsg;
  }

  return formatted;
};

export const FetchImagePath = (imgName) => {
  return `${BASE_URL}/images/${imgName}`;
};

export const DEFAULT_LOGO_IMAGE = FetchImagePath('default-logo.png');

export const DEFAULT_SEARCH_IMAGE = FetchImagePath('default-search.png');

export const DEFAULT_LOGO_WIDTH = 50;

export const DEFAULT_LOGO_HEIGHT = 50;

export const NormalizeBookObject = (book) => {
  if ('volumeInfo' in book) {
    const bookVolume = book.volumeInfo;
    let coverImage = DEFAULT_LOGO_IMAGE;
    if (bookVolume.imageLinks) {
      if ('thumbnail' in bookVolume.imageLinks) {
        coverImage = bookVolume.imageLinks.thumbnail;
      }
    }
    const authorsFormatted = FormatArrayTexts(
      bookVolume.authors,
      'No authors found'
    );

    let isbnsFormatted = '';
    if (bookVolume.industryIdentifiers) {
      isbnsFormatted = FormatArrayTexts(
        bookVolume.industryIdentifiers.map((isbn) => isbn.identifier),
        'No ISBNs found'
      );
    }

    let categories = '';
    if (bookVolume.categories) {
      categories = FormatArrayTexts(
        bookVolume.categories,
        'No Categories Found'
      );
    }
    return {
      id: book.id,
      title: bookVolume.title,
      authors: authorsFormatted,
      description: bookVolume.description,
      coverImage,
      isbn: isbnsFormatted,
      publisher: bookVolume.publisher,
      categories,
      publishDate: bookVolume.publishDate,
      type: 'google-book',
    };
  }

  return {
    id: book._id,
    title: book.title,
    authors: book.author,
    description: book.description,
    coverImage: book.coverImage,
    isbn: book.isbn,
    publisher: book.publisher,
    categories: book.categories,
    publishDate: book.publishDate,
    type: 'db-book',
  };
};

export const CATEGORIES = [
  'Action and adventure',

  'Art/architecture',

  'Alternate history',

  'Autobiography',

  'Anthology',

  'Biography',

  'Business/economics',

  "Children's",

  'Crafts/hobbies',

  'Classic',

  'Cookbook',

  'Comic book',

  'Diary',

  'Coming-of-age',

  'Dictionary',

  'Crime',

  'Encyclopedia',

  'Drama',

  'Guide',

  'Fairytale',

  'Health/fitness',

  'Fantasy',

  'History',

  'Graphic novel',

  'Home and garden',

  'Historical fiction',

  'Humor',

  'Horror',

  'Journal',

  'Mystery',

  'Math',

  'Paranormal romance',

  'Memoir',

  'Picture book',

  'Philosophy',

  'Poetry',

  'Prayer',

  'Political thriller',

  'Religion, spirituality, and new age',

  'Romance',

  'Textbook',

  'Satire',

  'True crime',

  'Science fiction',

  'Review',

  'Short story',

  'Science',

  'Suspense',

  'Self help',

  'Thriller',

  'Sports and leisure',

  'Western',

  'Travel',

  'Young adult',

  'True crime',
];
