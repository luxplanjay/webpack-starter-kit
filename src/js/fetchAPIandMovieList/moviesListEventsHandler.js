import fetchAPI from './fetchAPI';
import debounce from 'lodash.debounce';
import renderMovies from './renderMovies.js';
import movieListTmp from '../../template/moviesListTemplate.hbs';
import renderPagination from '../pagination';
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

export async function showMoviesInTrend(page = 1) {
  //fetchAPI.resetPageToFirst();

  refs.moviesContainerRef.innerHTML = '';
  return fetchAPI.getTrendingMovies(page).then(response => {
    renderMovies(response.results, refs.moviesContainerRef, movieListTmp);
    return response;
    //renderPagination(response.total_results);
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
async function initProgramFilmoteka() {
  const response = await showMoviesInTrend();
  renderPagination(response.total_results);
}
initProgramFilmoteka();
