import axios from 'axios';

const ApiKey = '55031673-78c5d9f5db54785dbd85479b8';
const url = 'https://pixabay.com/api/';
const perPage = 15;

export async function getImagesByQuery(query, page = 1) {
  const { data } = await axios.get(url, {
    params: {
      q: query,
      key: ApiKey,
      page: page,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: perPage,
    },
  });
  return data;
}
