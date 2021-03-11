import pagination from './pagination.js';
import fnFetch from './fetch.js';
import apiService from './apiService.js';
import { HOME, SEARCH, WATCHED, QUEUE } from './request.js';
import { load, save, remove } from './storage';
import showErrorNote from './error-notification';
import refs from './refs';

export default {
  onSubmitSearchForm(event) {
    event.preventDefault();
    const searchQuery = event.target.elements.query.value.trim();
    console.log('search', searchQuery);
    if (!searchQuery) {
      showErrorNote(refs.errorNoteRef);
      refs.filmListRef.innerHTML = '';
      refs.paginationList.innerHTML = '';
      return;
    }
    apiService.searchQuery = searchQuery;
    save('currentRequest', SEARCH);
    fnFetch.fetchData();
  },

  onClickPaginate(event) {
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
        fnFetch.fetchData(fetchSettings, pagePagination);
        break;
      case WATCHED:
        fnFetch.fetchDataLibrary(pagePagination, load('watched'));
        break;
      case QUEUE:
        fnFetch.fetchDataLibrary(pagePagination, load('queue'));
        break;
      default:
        console.log(Error('Не найден тип текущего запроса'));
    }
  },
  onClickFilm(event) {

  if (event.target.classList.contains('films__list')){return;}
    const movieId = event.path.find(
      elem => elem.classList.value === 'film item',
    ).dataset.movieid;
    event.preventDefault();
    fnFetch.fetchDataFilm(movieId);
  },

  onClickLibrary() {
    const req = refs.libraryList.querySelector('.is-active').dataset.request;
    save('currentRequest', req);
    fnFetch.fetchDataLibrary(1, load(req));
  },
  onClickWatched() {
    save('currentRequest', WATCHED);
    fnFetch.fetchDataLibrary(1, load('watched'));
  },

  onClickQueue() {
    save('currentRequest', QUEUE);
    fnFetch.fetchDataLibrary(1, load('queue'));
  },
  onClickLogoHome() {
    save('currentRequest', HOME);
    fnFetch.fetchData();
  },
};
