import './sass/main.scss';
import refs from './js/refs';
import './js/up-btn';
import './js/header-position';
import './js/storage';
import './js/themes';
import './js/theme-change';
import './js/footermodal.js';
import showErrorNote from'./js/error-notification';

import createHeaderHomeMarkup from './js/header-render';
createHeaderHomeMarkup();

import addContent from './js/addContent';
import apiService from './js/apiService.js';
import pagination from './js/pagination.js';
const searchFormRef = document.querySelector('.search-form');
const errorNoteRef = document.querySelector('.header__error');
const Request = {
  HOME: 'home',
  LIBRARY: 'library',
  SEARCH: 'search',
  FILM: 'film',
};

localStorage.setItem('currentRequest', Request.HOME);

fetchDataForMainPage();

async function fetchDataForMainPage(
  fetchSettings = [{ page: 1, numStart: 0, numEnd: apiService.perPage }],
  pagePagination = 1,
) {
  try {
    let resultArrayForAddContent = [];
    let totalPages;
    let totalResults;

    for (let set of fetchSettings) {
      const resAwait = await apiService.fetchDataTrending(set);
      totalPages = resAwait.total_pages;
      totalResults = resAwait.total_results;
      resultArrayForAddContent = [
        ...resultArrayForAddContent,
        ...resAwait.results.slice(set.numStart, set.numEnd),
      ];
    }

    addContent.additemList(resultArrayForAddContent);
    pagination.addPaginationList(totalPages, totalResults, pagePagination);
    localStorage.setItem('currentRequest', Request.HOME);
  } catch (error) {
    throw error;
  }
}
async function fetchDataSearch(
  fetchSettings = [{ page: 1, numStart: 0, numEnd: apiService.perPage }],
  pagePagination = 1,
) {
  try {
    let resultArrayForAddContent = [];
    let totalPages;
    let totalResults;

    for (let set of fetchSettings) {
      const resAwait = await apiService.fetchDataSearch(set);
      totalPages = resAwait.total_pages;
      totalResults = resAwait.total_results;
      resultArrayForAddContent = [
        ...resultArrayForAddContent,
        ...resAwait.results.slice(set.numStart, set.numEnd),
      ];
    }

    addContent.additemList(resultArrayForAddContent);
    pagination.addPaginationList(totalPages, totalResults, pagePagination);
    localStorage.setItem('currentRequest', Request.SEARCH);
  } catch (error) {
    throw error;
  }
}

async function fetchDataLibrary() {
  localStorage.setItem('currentRequest', Request.LIBRARY);
}
async function fetchDataFilm() {
  localStorage.setItem('currentRequest', Request.FILM);
}

function onSubmitSearchForm(event) {
  event.preventDefault();
  const searchQuery = event.target.elements.query.value;
  
  if (!searchQuery) {
    showErrorNote(errorNoteRef);
    //вывести сообщение пользователю, что ничего не найдено, а вдруг сам не догадается
    // есть глюк, надо подправить
    return;
  }
  apiService.searchQuery = searchQuery;
  fetchDataSearch();
}

function onClickPaginate(event) {
  if (event.target.nodeName !== 'LI' || event.target.textContent === '...') {
    return;
  }
  const pagePagination = pagination.getActivePageForFetch(event.target);
  const fetchSettings = pagination.getSettingForFetch(pagePagination);
  const currentRequest = localStorage.getItem('currentRequest');

  switch (currentRequest) {
    case Request.HOME:
      fetchDataForMainPage(fetchSettings, pagePagination);
      break;
    case Request.LIBRARY:
      fetchDataLibrary(fetchSettings, pagePagination);
      break;
    case Request.SEARCH:
      fetchDataSearch(fetchSettings, pagePagination);
      break;

    default:
      console.log(Error('Не найден тип текущего запроса'));
  }
}

searchFormRef.addEventListener('submit', onSubmitSearchForm);
refs.paginationBox.addEventListener('click', onClickPaginate);
