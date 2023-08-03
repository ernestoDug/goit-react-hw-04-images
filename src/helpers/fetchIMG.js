import axios from 'axios';

// import { inputValue } from 'components/Searchbar/Searchbar';
const MY_KEY = '28539247-0afb9c376c93f2bc11eaacc3c';

const BASE_URL = 'https://pixabay.com/api';

export const fetchIMG = (searchWord, page = 2) => {
  const responseIMG = axios.get(
    `${BASE_URL}/?key=${MY_KEY}&q=${searchWord}&page=${page}`,
    {
      params: {
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 12,
      },
    }
  );
  // console.log(page, '8889')
  return responseIMG;
};
// fetchIMG.then(console.log(responseIMG.data))
