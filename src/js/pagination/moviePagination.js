import api from '../api/apiFetching';
import moviesListTemplate from '../../templates/galleryCardTemplate.hbs';
import { generatePosterPath } from '../movieHelpers/generatePoster';

class MoviePagination {
  #movies = [];
  constructor(selector) {
    this.element = document.querySelector(selector);
    this.#movies = [];
    this.currentPage = 1;
    this.totalPages = 0;
    this.totalGenres = [];
    this.goToPrevPage = this.goToPrevPage.bind(this);
    this.goToNextPage = this.goToNextPage.bind(this);
  }

  get movies() {
    return this.#movies;
  }

  set movies(movieList) {
    if (!movieList) {
      console.error('list non exist');
    }
    this.#movies = movieList;
    this.render();
  }

  // run this first in outer code - gets list of genres from the server and shows the first page of trending movies
  init() {
    this.getAllGenres();
    this.loadFirstPage();
  }

  // shows the first page of trending movies
  loadFirstPage() {
    return this.fetchMovies().then(data => {
      this.prepareMovies();
      this.render();
    });
  }

  // fetches current page of trending movies
  fetchMovies() {
    return api.fetchPopularFilms(this.currentPage).then(data => {
      const { results, total_pages } = data;
      this.totalPages = total_pages;
      this.#movies = results;
      return results;
    });
  }

  // renders markup
  render() {
    this.element.innerHTML = moviesListTemplate(this.movies);
  }

  // prepares info for movie cards
  prepareMovies() {
    this.movies.forEach(movie => {
      this.findMovieGenres(movie);
      this.getReleaseYear(movie);
      this.getPosterImg(movie);
    });
  }

  // gets an array of all genres from the server
  getAllGenres() {
    api.fetchGanres().then(result => {
      const { genres } = result;
      this.totalGenres = [...genres];
    });
  }

  // translates array of genres of a movie to a string, limits count of genres to 3
  findMovieGenres(movie) {
    const maxGenresViewed = 3;
    if (movie.genre_ids.length > maxGenresViewed) {
      movie.genre_ids = movie.genre_ids.slice(0, 3);
      this.convertGenreIds(movie);
      movie.genre_ids.splice(maxGenresViewed - 1, 1, 'Other');
      movie.genre_ids = this.convertMovieGenresToString(movie.genre_ids);
      return;
    }
    movie.genre_ids = movie.genre_ids.slice(0, 3);
    this.convertGenreIds(movie);
    movie.genre_ids = this.convertMovieGenresToString(movie.genre_ids);
  }

  // converts movie's genres from ids to names ([28, 12] -> [Action, Adventure])
  convertGenreIds(movie) {
    for (let i = 0; i < movie.genre_ids.length; i++) {
      const genre = this.totalGenres.find(
        genreItem => genreItem.id === movie.genre_ids[i],
      );
      movie.genre_ids[i] = genre.name;
    }
  }

  // creates a string of movie's genres
  convertMovieGenresToString(genres) {
    genres = genres.join(', ');
    return genres;
  }

  // coverts release date to a year (2017-03-21 -> 2017)
  getReleaseYear(movie) {
    const date = new Date(movie.release_date);
    const year = date.getFullYear();
    movie.release_date = year;
  }

  // generates path of a movie's poster image
  getPosterImg(movie) {
    movie.backdrop_path = generatePosterPath(movie.backdrop_path);
  }

  goToPrevPage() {
    if (this.currentPage === 1) {
      return;
    }

    this.currentPage -= 1;
    this.fetchMovies().then(results => {
      this.#movies = results;
      this.prepareMovies();
      this.render();
    });
  }

  goToNextPage() {
    if (this.currentPage === this.totalPages) {
      return;
    }

    this.currentPage += 1;
    this.fetchMovies().then(results => {
      this.#movies = results;
      this.prepareMovies();
      this.render();
    });
  }
}

export default MoviePagination;
