import { BASE_URL } from '../services/api';

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

export const DEFAULT_SEARCH_IMAGE = FetchImagePath('default-search.jpg');
