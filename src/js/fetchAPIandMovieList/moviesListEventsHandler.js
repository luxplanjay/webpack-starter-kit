import fetchAPI from './fetchAPI';
import debounce from 'lodash.debounce';
import renderMovies from './renderMovies.js';
import movieListTmp from '../../template/moviesListTemplate.hbs';
const refs = {
  movieInputRef: document.querySelector('.movie-searchTag-js'),
  moviesContainerRef: document.querySelector('.movies-container-js'),
};
function searchMovies() {
  refs.moviesContainerRef.innerHTML = '';
  fetchAPI.searchMoviesbyTag().then(results => {
    renderMovies(results, refs.moviesContainerRef, movieListTmp);
    //console.log(results);
  });
}

function showMoviesInTrend() {
  refs.moviesContainerRef.innerHTML = '';
  fetchAPI.getTrendingMovies().then(results => {
    renderMovies(results, refs.moviesContainerRef, movieListTmp);
    //console.log(results);
  });
}

function inputHandler(event) {
  const movieName = event.target.value;
  if (movieName == '') {
    showMoviesInTrend();
    return;
  }
  fetchAPI.movieName = movieName;
  fetchAPI.resetPageToFirst();
  searchMovies();
}

refs.movieInputRef.addEventListener('input', debounce(inputHandler, 500));

showMoviesInTrend();
