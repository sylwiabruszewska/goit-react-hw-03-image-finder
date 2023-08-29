// axios
import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const searchParams = new URLSearchParams({
  key: '38106260-22c65560723f63c5e0affa5f7',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  page: 1,
  per_page: 12,
});

async function getImages(query) {
  try {
    const url = `?${searchParams}&q=${encodeURIComponent(query)}`;
    const response = await axios.get(url);

    return response.data.hits;
  } catch (error) {
    console.error('An error occurred while fetching images:', error);
    throw error;
  }
}

export { getImages, searchParams };
