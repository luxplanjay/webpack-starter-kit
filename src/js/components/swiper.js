import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper-bundle.min.js';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';

SwiperCore.use([Navigation, Pagination]);
const swiper = new Swiper('.image-container', {
  speed: 0,
  direction: 'vertical',
  autoHeight: false,
  simulateTouch: false,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    renderBullet: function (i, className) {
      return '<span class="' + className + '">' + (i + 1) + '</span>';
    },
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
    pageUpDown: true,
  },
  watchOverflow: true,
  breakpoints: {
        320: {
          slidesPerGroupSkip: 1,
          slidesPerGroup: 1,
          slidesPerView: 1,
          slidesPerRow: 4,
        },
        768: {
          slidesPerGroupSkip: 1,
          slidesPerGroup: 1,
          slidesPerView: 1,
          slidesPerRow: 2,
        },
        1024: {
          slidesPerGroupSkip: 1,
          slidesPerGroup: 1,
          slidesPerView: 1,
          slidesPerRow: 3,
        },
}})

export default swiper;
