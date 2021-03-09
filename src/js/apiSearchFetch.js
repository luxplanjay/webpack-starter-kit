import spinner from '../templates/spinner.hbs';

export default {
  apiKey: '2d2272085b6a086155bacb1413ae9080',
  searchQuery: '',
  _page: 1,
  _searchUrl: 'https://api.themoviedb.org/3/search/movie',
  _popularUrl: 'https://api.themoviedb.org/3/trending/movie/day',
  fetchMovie(searchQuery) {
    const url = this.baseUrl + `?api_key=${this.apiKey}&query=${searchQuery}`;
    return fetch(url)
      .then(res => res.json())
      .then(({ results }) => results);
  },
  fetchGenres() {
    const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=en-US`;
    return fetch(genresUrl)
      .then(response => response.json())
      .then(({ genres }) => genres)
      .catch(error => console.log(error));
  },

  get query() {
    return this.searchQuery;
  },

  set query(newQuery) {
    this.searchQuery = newQuery;
  },
  get searchUrl() {
    return `${this._baseUrl}&query=${this.searchQuery}`;
  },
  get page() {
    return this._page;
  },
  set page(pageForSet) {
    this._page = pageForSet;
  },
  get searchUrl() {
    return this._searchUrl;
  },
  get popularUrl() {
    return this._popularUrl;
  },
  //ajax option for pagination
  ajaxBeforeSendSearchFnc: function () {
    $('#js-grid').html(spinner());
  },
  //pagination option
  get ajaxDataForSearch() {
    return {
      data: {
        api_key: this.apiKey,
        query: this.searchQuery,
        page: this._page,
      },
      beforeSend: this.ajaxBeforeSendSearchFnc,
    };
  },
  get ajaxDataForPopular() {
    return {
      data: {
        api_key: this.apiKey,
        page: this._page,
      },
      beforeSend: this.ajaxBeforeSendSearchFnc,
    };
  },
};
