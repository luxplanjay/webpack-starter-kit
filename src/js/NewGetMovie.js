export default class NewGetMovie {
  constructor() {}

  fetchTrendingMovie() {
    const url =
      'https://api.themoviedb.org/3/trending/movie/day?api_key=6df9a2b88a6cdc986e05b3daaeb09968';
    return fetch(url)
      .then(r => r.json())
      .then(data => {
        return data.results;
      });
  }
}