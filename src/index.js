import './sass/main.scss';
import refs from './js/refs';
import './js/up-btn';
import './js/header-position';
import './js/storage';
import './js/themes';
import './js/theme-change';
import './js/footermodal.js';
import showErrorNote from './js/error-notification';

import createHeaderHomeMarkup from './js/header-render';
createHeaderHomeMarkup();

import keyWords from './js/keyWords';
// keyWords()

import apiService from './js/apiService.js';
import pagination from './js/pagination.js';
import fnFetch from './js/fetch.js';
import request from './js/request.js';

const searchFormRef = document.querySelector('.search-form');
const errorNoteRef = document.querySelector('.header__error');

localStorage.setItem('currentRequest', request.HOME);

fnFetch.fetchDataForMainPage();

fnFetch.fetchDataForMainPage();

function onSubmitSearchForm(event) {
  event.preventDefault();
  const searchQuery = event.target.elements.query.value;

  if (!searchQuery) {
    showErrorNote(errorNoteRef);
    return;
  }
  apiService.searchQuery = searchQuery;
  fnFetch.fetchDataSearch();
}

function onClickPaginate(event) {
  if (event.target.nodeName !== 'LI' || event.target.textContent === '...') {
    return;
  }
  const pagePagination = pagination.getActivePageForFetch(event.target);
  const fetchSettings = pagination.getSettingForFetch(pagePagination);
  const currentRequest = localStorage.getItem('currentRequest');

  switch (currentRequest) {
    case request.HOME:
      fnFetch.fetchDataForMainPage(fetchSettings, pagePagination);
      break;
    case request.LIBRARY:
      fnFetch.fetchDataLibrary(fetchSettings, pagePagination);
      break;
    case request.SEARCH:
      fnFetch.fetchDataSearch(fetchSettings, pagePagination);
      break;

    default:
      console.log(Error('Не найден тип текущего запроса'));
  }
}

function onClickFilm(event) {
  console.log(event.target.nodeName, event.target.dataset, event);
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const movieId = event.target.dataset.movieid;
  fnFetch.fetchDataFilm(movieId);
}

searchFormRef.addEventListener('submit', onSubmitSearchForm);
refs.paginationBox.addEventListener('click', onClickPaginate);
refs.filmListRef.addEventListener('click', onClickFilm);
