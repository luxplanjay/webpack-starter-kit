import gallery from '../templates/gallery.hbs';
import contentObserver from './observer';

//import swiper from './components/swiper';
//для пагинации
// import $ from 'jquery';
// global.jQuery = $;
// global.$ = $;
// import 'paginationjs/dist/pagination.css';
// require("paginationjs");

// const swiperContainer = document.querySelector('.swiper-container').swiper

const galleryContainer = document.querySelector('.image-slider');

export default function updateMarkupGallery(dataMovies) {
  const markup = gallery(dataMovies);
  galleryContainer.insertAdjacentHTML('beforeend', markup);
  //пагинация
//     $('#pagination-container').pagination({
//     dataSource: [1, 2, 3, 4, 5, 6, 7],
//     pageSize: 9,
//     pageRange: 6,
//     callback: function(data, pagination) {
//         const html = gallery(dataMovies);
//         $('#data-container').append(html);
//     }
// })
  const leashRepeatFetch = document.querySelector('.image-slider li:nth-last-of-type(5)');
  contentObserver(leashRepeatFetch)
  //пагинация свайпера
  //swiper.update();
}