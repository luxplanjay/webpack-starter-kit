import './sass/main.scss';
import refs from './js/refs';
import './js/up-btn';
import './js/header-position';
import './js/storage';
import './js/themes';
import './js/theme-change';
import './js/footermodal.js';
import showErrorNote from './js/error-notification';
import './js/modal';
import './js/modal-close';
import movieLibrary from './js/movieLibrary';

import createHeaderHomeMarkup from './js/header-render';
createHeaderHomeMarkup();

import keyWords from './js/keyWords';
// keyWords()

import apiService from './js/apiService.js';
import pagination from './js/pagination.js';
import fnFetch from './js/fetch.js';
import { HOME, LIBRARY, SEARCH, WATCHED, QUEUE, FILM } from './js/request.js';
import { load, save, remove } from './js/storage';
// import modal from './js/modal';

const searchFormRef = document.querySelector('.search-form');
const errorNoteRef = document.querySelector('.header__error');
save('currentRequest', HOME);

fnFetch.fetchData();

function onSubmitSearchForm(event) {
  event.preventDefault();
  const searchQuery = event.target.elements.query.value;

  if (!searchQuery) {
    showErrorNote(errorNoteRef);
    return;
  }
  apiService.searchQuery = searchQuery;
  save('currentRequest', SEARCH);
  fnFetch.fetchData();
}

function onClickPaginate(event) {
  if (event.target.nodeName !== 'LI' || event.target.textContent === '...') {
    return;
  }
  const pagePagination = pagination.getActivePageForFetch(event.target);
  const fetchSettings = pagination.getSettingForFetch(pagePagination);
  const currentRequest = load('currentRequest');
  switch (currentRequest) {
    case HOME:
      fnFetch.fetchData(fetchSettings, pagePagination);
      break;
    case SEARCH:
      fnFetch.fetchData(pagePagination);
      break;
    case WATCHED:
      fnFetch.fetchDataLibrary(pagePagination);
      break;
    case QUEUE:
      fnFetch.fetchDataLibrary(pagePagination);
    default:
      console.log(Error('Не найден тип текущего запроса'));
  }
}

function onClickFilm(event) {
  const movieId = event.path.find(elem => elem.classList.value === 'film item')
    .dataset.movieid;
  event.preventDefault();
  fnFetch.fetchDataFilm(movieId);
}

function onClickLibrary() {
  save('currentRequest', WATCHED);
  fnFetch.fetchDataLibrary();
}

// function onClickHome() {
//   console.log('мы тут?');

//   save('currentRequest', HOME);
// }
// function onClickWatched() {
//   save('currentRequest', WATCHED);
// }
// function onClickQueue() {
//   save('currentRequest', QUEUE);
// }

searchFormRef.addEventListener('submit', onSubmitSearchForm);
refs.paginationBox.addEventListener('click', onClickPaginate);
refs.filmListRef.addEventListener('click', onClickFilm);
refs.pageLibraryRef().addEventListener('click', onClickLibrary);
// refs.pageHomeRef().addEventListener('click', onClickHome);
