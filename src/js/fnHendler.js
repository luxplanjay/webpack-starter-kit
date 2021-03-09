import pagination from './pagination.js';
import fnFetch from './fetch.js';
import apiService from './apiService.js';
import { HOME, SEARCH, WATCHED, QUEUE } from './request.js';
import { load, save, remove } from './storage';
import showErrorNote from './error-notification';

export default {
  onSubmitSearchForm(event) {
    event.preventDefault();
    const searchQuery = event.target.elements.query.value;

    if (!searchQuery) {
      //   showErrorNote(errorNoteRef);
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
    const movieId = event.path.find(
      elem => elem.classList.value === 'film item',
    ).dataset.movieid;
    event.preventDefault();
    fnFetch.fetchDataFilm(movieId);
  },

  onClickLibrary() {
    save('currentRequest', QUEUE);
    fnFetch.fetchDataLibrary(1, load('queue'));
  },
};
