import gallery from '../templates/gallery.hbs';
import swiper from './components/swiper';

// const swiperContainer = document.querySelector('.swiper-container').swiper
const galleryContainer = document.querySelector('.image-slider');

export default function updateMarkupGallery(data) {
  galleryContainer.innerHTML = '';
  const markup = gallery(data);
  galleryContainer.insertAdjacentHTML('beforeend', markup);
  swiper.update();
}
