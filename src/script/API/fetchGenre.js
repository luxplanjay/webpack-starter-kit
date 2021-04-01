import settings from '../js/settings';
const BASE_URL = settings.BASE_URL;
const API_KEY = settings.API_KEY;

export default class FetchGenre {
  constructor() {
    this.ganreObject = {};
    this.handleGenre();
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
}
