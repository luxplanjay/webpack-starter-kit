import CONST from '../js/settings';
const { BASE_URL, API_KEY } = CONST;

export default class FetchSearchMovie {
  constructor() {
    this.searchQuery = '';
    this._page = 1;
  }

  async fetchMovies() {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${this.searchQuery}&page=${this.page}`;
    return await fetch(url).then(response => response.ok ? response.json() : []);
  }

  incrementPage() {
    this._page += 1;
  }

  resetPage() {
    this._page = 1;
  }
  
  decrementPage() {
    this._page -= 1;
  }
  get page() {
    return this._page;
  }
  set page(value) {
    this._page = value;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }


  
}