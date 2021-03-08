import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper-bundle.min.js';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';

SwiperCore.use([Navigation, Pagination]);
const swiper = new Swiper('.swiper-container', {
  spaceBetween: 20,
  autoHeight: false,
  slidesPerColumnFill: 'row',
  breakpoints: {
    320: {
      slidesPerView: 1,
      slidesPerColumn: 1,
    },
    768: {
      slidesPerView: 2,
      slidesPerColumn: 3,
      spaceBetween: 30,
    },
    1030: {
      slidesPerView: 3,
      slidesPerColumn: 3,
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
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

export default swiper;
