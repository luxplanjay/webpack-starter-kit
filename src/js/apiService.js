export default {
  query: '',
  page: 1,
  perPage: 12,
  lastPage: false,
  keyApi: '0e6eebd27dfd68a7c4ec96f04756cc6c',

  fetchReturn(url, opts) {
    return fetch(url, opts)
      .then(response => response.json())
      .then(data => data)
      .catch(console.error);
  },

  fetchDataTrending() {
    const urlApi = `https://api.themoviedb.org/3/trending/movie/week?api_key=${this.keyApi}&page=${this.page}`;
    const options = {
      headers: {
        Accept: 'application/json',
      },
    };

    return this.fetchReturn(urlApi, options);
  },

  fetchDataSearch() {
    const urlApi = `https://api.themoviedb.org/3/search/movie?api_key=${this.keyApi}&page=${this.page}&query=${this.query}`;
    console.log('hh', urlApi);

    const options = {
      headers: {
        Accept: 'application/json',
      },
    };

    return this.fetchReturn(urlApi, options);
  },
  fetchDenalFilm() {},

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
};
