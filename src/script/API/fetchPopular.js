const BASE_URL = 'https://api.themoviedb.org/3/';
const KEY_API = 'dc8a219507b80e9a1079e61c31f6a77a';
import createMarkup from '../templates/galleryCard.hbs';

export { BASE_URL, KEY_API };
export default class PopularFilms {
  constructor(createGenreTranpiler, galleryRef) {
    this._page = 1;
    this.galleryRef = galleryRef;
    this.handlerPopularMovies();
    this.createGenreTranpiler = createGenreTranpiler;
    this.ResultAmount = 0;
  }
  async fetchPopular() {
    const response = await fetch(
      `${BASE_URL}/trending/movie/day?api_key=${KEY_API}&page=${this._page}`,
    );
    return response.json();
  }
  async handlerPopularMovies() {
    const result = await this.fetchPopular();
    console.log(result);
    this.resultAmount = result.total_results;
    result.results.map(elem =>
      this.createGenreTranpiler(elem.genre_ids).then(arr => {
        elem.genre_ids = arr.slice(0, 3).join(', ');
        elem.release_date = elem.release_date.slice(0, 4);
        const markup = createMarkup(elem);
        this.galleryRef.insertAdjacentHTML('beforeend', markup);
      }),
    );
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
