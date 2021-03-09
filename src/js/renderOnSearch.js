import searchResultTmpl from '../templates/searchResult.hbs';
import swiper from './components/swiper';

// const swiperContainer = document.querySelector('.swiper-container').swiper
const galleryContainer = document.querySelector('.image-slider');

export default function renderOnSearch(data) {
  galleryContainer.innerHTML = '';
  const markup = searchResultTmpl(data);
  galleryContainer.insertAdjacentHTML('beforeend', markup);
  swiper.update();
}
