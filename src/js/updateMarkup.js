import gallery from '../templates/gallery.hbs';
import swiper from './components/swiper';

const swiperContainer = document.querySelector('.swiper-container').swiper
const galleryContainer = document.querySelector('.image-slider');

export default function updateMarkupGallery(data) {
  // if (!data) {
  //   return console.log('fuck');
  // }
  const markup = gallery(data);
  return galleryContainer.insertAdjacentHTML('beforeend', markup);
}

//  swiper.document.querySelector('.swiper-container').swiper;
