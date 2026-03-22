import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let gallery = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250, // затримка перед показом підпису
  animationSpeed: 120, // швидкість анімації
  fadeSpeed: 80, // швидкість затемнення
  preloading: true,
});
export const refs = {
  form: document.querySelector('.form'),
  ulGallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  btnLoadMore: document.querySelector('.btnLoadMore'),
};

function imageTemplate(image) {
  return `<li>
        <a href="${image.largeImageURL}">
          <div>
            <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
          </div>
          <div class="info">
            <div class="info-item">
              <b>Likes</b>
              <span>${image.likes}</span>
            </div>
            <div class="info-item">
              <b>Views</b>
              <span>${image.views}</span>
            </div>
            <div class="info-item">
              <b>Comments</b>
              <span>${image.comments}</span>
            </div>
            <div class="info-item">
              <b>Downloads</b>
              <span>${image.downloads}</span>
            </div>
          </div>
        </a>
      </li>`;
}
function imagesTemplate(images) {
  return images.map(imageTemplate).join('\n');
}

export function createGallery(images) {
  const markup = imagesTemplate(images);
  refs.ulGallery.insertAdjacentHTML('beforeend', markup);
  gallery.refresh();
}
export function clearGallery() {
  refs.ulGallery.innerHTML = '';
}
export function showLoader() {
  refs.loader.style.display = 'block';
}
export function hideLoader() {
  refs.loader.style.display = 'none';
}
export function showLoadMoreButton() {
  refs.btnLoadMore.style.display = 'block';
}

export function hideLoadMoreButton() {
  refs.btnLoadMore.style.display = 'none';
}
