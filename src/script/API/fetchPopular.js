import settings from '../js/settings';
const BASE_URL = settings.BASE_URL;
const API_KEY = settings.API_KEY;

import createMarkup from '../templates/galleryCard.hbs';

export default class PopularFilms {
  constructor(createGenreTranpiler, galleryRef) {
    this._page = 1;
    // this.galleryRef = galleryRef;
    // this.handlerPopularMovies();
    // this.createGenreTranpiler = createGenreTranpiler;
    this.resultAmount = 0;
    this.result;
    this.ganreObject = {};
    this.handleGenre();
    this.handlerPopularMovies();
  }
  async fetchPopular() {
    const response = await fetch(
      `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${this._page}`,
    );
    return response.json();
  }
  async handlerPopularMovies() {
    this.result = await this.fetchPopular();
    this.resultAmount = this.result.total_results;
    this.result.results.forEach(elem => {
      elem.release_date = elem.release_date.slice(0, 4);
      elem.genre_ids = this.ganreTranspiler(elem.genre_ids);
      elem.genre_ids = elem.genre_ids.slice(0, 3).join(', ');
    });
    console.log(this.result.results);
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
  // async handlerPopularMovies() {
  //   const result = await this.fetchPopular();
  //   console.log(result);
  //   this.resultAmount = result.total_results;
  //   result.results.map(elem =>
  //     this.createGenreTranpiler(elem.genre_ids).then(arr => {
  //       elem.genre_ids = arr.slice(0, 3).join(', ');
  //       elem.release_date = elem.release_date.slice(0, 4);
  //       const markup = createMarkup(elem);
  //       this.galleryRef.insertAdjacentHTML('beforeend', markup);
  //     }),
  //   );
  // }
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
