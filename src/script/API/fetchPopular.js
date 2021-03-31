import settings from '../js/settings';
const BASE_URL = settings.BASE_URL;
const API_KEY = settings.API_KEY;

export default class PopularFilms {
  constructor() {
    this._page = 1;
    this.resultAmount = 0;
    this.result;
    this.ganreObject = {};
    this.handleGenre();
  }
  async fetchPopular() {
    const response = await fetch(
      `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${this._page}`,
    );
    return response.json();
  }

  async fetchGenre() {
    const response = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`,
    );
    return response.json();
  }
  async handleGenre() {
    this.ganreObject = await this.fetchGenre();
  }
  ganreTranspiler(arr) {
    const arrayNameGenres = [];
    arr.forEach(elem =>
      this.ganreObject.genres
        .filter(obj => obj.id === elem)
        .forEach(obj => arrayNameGenres.push(obj.name)),
    );
    return arrayNameGenres;
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
  getResultAmount() {
    return this.resultAmount;
  }
}
