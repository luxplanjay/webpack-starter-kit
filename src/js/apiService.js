import { load, save, remove } from './storage';
import { HOME, SEARCH } from './request.js';

export default {
  ulrApi: '',
  query: '',
  page: 1,
  keyApi: '0e6eebd27dfd68a7c4ec96f04756cc6c',
  language: 'en-US',
  currentRequest: '',

  fetchReturn(url, opts) {
    return fetch(url, opts)
      .then(response => response.json())
      .then(data => data)
      .catch(console.error);
  },

  fetchData({ page: currentPage = 1 }) {
    this.page = currentPage;

    this.currentRequest = load('currentRequest');
    console.log(load('currentRequest'));
    console.log(this.currentRequest);

    switch (this.currentRequest) {
      case HOME:
        this.urlApi = `https://api.themoviedb.org/3/trending/movie/week?api_key=${this.keyApi}&page=${this.page}&language=${this.language}`;
        break;

      case SEARCH:
        this.urlApi = `https://api.themoviedb.org/3/search/movie?api_key=${this.keyApi}&page=${this.page}&query=${this.query}&language=${this.language}`;
        break;

      default:
        console.log(Error('Не найден тип текущего запроса'));
    }

    const options = {
      headers: {
        Accept: 'application/json',
      },
    };

    return this.fetchReturn(this.urlApi, options);
  },

  fetchDetalsFilm(movieId) {
    const urlApi = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${this.keyApi}&language=${this.language}`;

    const options = {
      headers: {
        Accept: 'application/json',
      },
    };

    return this.fetchReturn(urlApi, options);
  },

  set searchQuery(value) {
    this.query = value;
  },

  get searchQuery() {
    return this.query;
  },

  get perPage() {
    if (document.body.clientWidth < 768) {
      return 4;
    }
    if (document.body.clientWidth < 1024) {
      return 8;
    }
    return 9;
  },
  get languageReq() {
    return this.language;
  },
  set languageReq(value) {
    this.language = value;
  },
};
