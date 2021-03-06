export default {
    key: '2d2272085b6a086155bacb1413ae9080',
    page: 1,
  
    fetchPopular() {
      const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${this.key}&page=${this.page}`;
      return fetch(url)
        .then(response => response.json())
        .then(({ results }) => results)
        .catch(error => console.log(error));
    },
  
    fetchGenres() {
      const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.key}&language=en-US`;
      return fetch(genresUrl)
        .then(response => response.json())
        .then(({ genres }) => genres)
        .catch(error => console.log(error));
    },
   };