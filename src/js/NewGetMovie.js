export default class NewGetMovie {
  constructor() {
    this.page = 1;
  }

  fetchTrendingMovie() {
    const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=6df9a2b88a6cdc986e05b3daaeb09968&page=${this.page}`;
    return fetch(url)
      .then(r => r.json())
      .then(data => {
        return data.results;
      });
  }
  fetchGenres() {
    const url =
      'https://api.themoviedb.org/3/genre/movie/list?api_key=6df9a2b88a6cdc986e05b3daaeb09968';
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        return data.genres;
      });
  }
  toCreateDataList() {
    return this.fetchTrendingMovie().then(data => {
      return this.fetchGenres().then(genresList => {
        return data.map(movie => ({
          ...movie,
          release_date: movie.release_date.split('-')[0],
          genres: movie.genre_ids
            .map(id => genresList.filter(el => el.id === id))
            .flat(),
        }));
      });
    });
  }
  fetchPopularArticlesPages() {
    const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=6df9a2b88a6cdc986e05b3daaeb09968&page=${this.page}`;
    return fetch(url).then(response => response.json());
  }

  getPage() {
    return this.page;
  }

  setPage(value) {
    this.page = value;
  }
}
