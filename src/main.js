import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  hideLoader,
  hideLoadMoreButton,
  refs,
  showLoader,
  showLoadMoreButton,
} from './js/render-functions';

let page = 1;
let query = '';
let totalPages = 0;
hideLoadMoreButton();
// обробник події для форми пошуку
refs.form.addEventListener('submit', async event => {
  event.preventDefault();
  showLoader();
  hideLoadMoreButton();
  // збираю дані з форми та отримую пошуковий запит
  const formData = new FormData(refs.form);
  query = formData.get('search-text').trim();

  // перевіряю, чи не порожній запит
  if (query === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query',
    });
    hideLoader();
    return;
  }
  page = 1;
  event.target.reset();
  clearGallery();

  // роблю запит до API та обробляю результат
  try {
    const data = await getImagesByQuery(query, page);
    hideLoader();
    // перевіряю, чи є результати
    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }
    // обчислюю загальну кількість сторінок
    totalPages = Math.ceil(data.totalHits / 15);
    // виводжу першу сторінку результатів
    createGallery(data.hits);
    checkBtnStatus();
  } catch (error) {
    // обробляю помилки
    hideLoader();
    console.log(error);
    iziToast.error({
      title: 'Error',
      message: `An error occurred while fetching images: ${error.message}`,
    });
  }
});

// обробник події для кнопки "Load More"
refs.btnLoadMore.addEventListener('click', async () => {
  page += 1;

  showLoader();
  hideLoadMoreButton();
  try {
    const data = await getImagesByQuery(query, page);
    hideLoader();
    createGallery(data.hits);

    checkBtnStatus();
    scrollPage();
  } catch (error) {
    hideLoader();
    console.log(error);
    iziToast.error({
      title: 'Error',
      message: `An error occurred while fetching images: ${error.message}`,
    });
  }
});

function checkBtnStatus() {
  if (page >= totalPages) {
    iziToast.info({
      title: 'Info',
      message: 'Це була остання сторінка',
    });
    hideLoadMoreButton();
  } else {
    showLoadMoreButton();
  }
}

function scrollPage() {
  const elem = refs.ulGallery.lastElementChild;
  const height = elem.getBoundingClientRect().height;
  console.log(height);
  console.log(elem);
  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
