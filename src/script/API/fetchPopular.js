const BASE_URL = 'https://api.themoviedb.org/3/';
const KEY_API = 'dc8a219507b80e9a1079e61c31f6a77a';
import createMarkup from '../templates/galleryCard.hbs';

export { BASE_URL, KEY_API };
export default class PopularFilms {
  constructor(createGenreTranpiler, galleryRef) {
    this.page = 1;
    this.galleryRef = galleryRef;
    this.handlerPopularMovies();
    this.createGenreTranpiler = createGenreTranpiler;
  }
  async fetchPopular() {
    const response = await fetch(
      `${BASE_URL}/trending/movie/day?api_key=${KEY_API}&page=${this.page}`,
    );
    return response.json();
  }
  async handlerPopularMovies() {
    const result = await this.fetchPopular();
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
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}
