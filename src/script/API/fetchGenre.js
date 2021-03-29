import { BASE_URL, KEY_API } from './fetchPopular';

export default class Genre {
  constructor() {
    this.createGenreTranpiler = this.createGenreTranpiler.bind(this);
  }
  async fetchGenre() {
    const response = await fetch(
      `${BASE_URL}genre/movie/list?api_key=${KEY_API}`,
    );
    return response.json();
  }
  async createGenreTranpiler(genre_ids) {
    const genresNames = await this.fetchGenre();
    const arrayNameGenres = [];
    for (let i = 0; i < genre_ids.length; i++) {
      genresNames.genres
        .filter(obj => obj.id === genre_ids[i])
        .map(obj => arrayNameGenres.push(obj.name));
    }
    return arrayNameGenres;
  }
}
