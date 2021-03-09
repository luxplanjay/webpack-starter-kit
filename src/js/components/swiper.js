import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper-bundle.min.js';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';

SwiperCore.use([Navigation, Pagination]);
const swiper = new Swiper('.swiper-container', {
  spaceBetween: 20,
  autoHeight: false,
  slidesPerColumnFill: 'row',
  // effect: 'fade',
  // fadeEffect:{
  //   crossFade: true,
  // },
  // slidesPerGroupSkip: 1,
  // virtualTranslate: false,
  // watchOverflow: true,
  // updateOnWindowResize: true,
  breakpoints: {
    320: {
      slidesPerGroupSkip: 1,
      // slidesPerGroup: 4,
      slidesPerView: 1,
      slidesPerColumn: 4,
      slidesPerRow: 1,
    },
    768: {
      slidesPerGroupSkip: 1,
      // slidesPerGroup: 6,
      slidesPerView: 2,
      slidesPerColumn: 3,
      spaceBetween: 30,
      slidesPerRow: 2,
    },
    1030: {
      slidesPerGroupSkip: 1,
      // slidesPerGroup: 9,
      slidesPerView: 3,
      slidesPerColumn: 3,
      slidesPerRow: 3,
      spaceBetween: 30,
    },
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    renderBullet: function (i, className) {
      return '<span class="' + className + '">' + (i + 1) + '</span>';
    },
  },
});

export default swiper;
