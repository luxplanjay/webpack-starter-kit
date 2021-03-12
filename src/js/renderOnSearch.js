import searchResultTmpl from '../templates/searchResult.hbs';
//import swiper from './components/swiper';
import contentObserver from './observer';

// const swiperContainer = document.querySelector('.swiper-container').swiper
const galleryContainer = document.querySelector('.image-slider');

export default function renderOnSearch(data) {
 
  const markup = searchResultTmpl(data);
  galleryContainer.insertAdjacentHTML('beforeend', markup);
  const leashRepeatFetch = document.querySelector('.image-slider li:nth-last-of-type(5)');
contentObserver(leashRepeatFetch);
  //swiper.update();
}
