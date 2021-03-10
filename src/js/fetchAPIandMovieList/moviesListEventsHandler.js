import fetchAPI from './fetchAPI';
import debounce from 'lodash.debounce';
import renderMovies from './renderMovies.js';
import movieListTmp from '../../template/moviesListTemplate.hbs';
import renderPagination from '../pagination';
import refs from '../refs.js';

function inputHandler(event) {
  const movieName = event.target.value;
  if (movieName == '') {
    fetchAPI.moviesSearchActive = false;
    initProgramFilmoteka();
    return;
  }
  fetchAPI.movieName = movieName;
  fetchAPI.moviesSearchActive = true;

  initProgramFilmoteka();
}

refs.movieInputRef.addEventListener('input', debounce(inputHandler, 500));
export async function initProgramFilmoteka() {
  let response;
  if (fetchAPI.moviesSearchActive === false) {
    response = await fetchAPI.showMoviesInTrend();
  } else if (fetchAPI.moviesSearchActive === true) {
    response = await fetchAPI.searchMovies();
  }
  renderPagination(response.total_results);
}
initProgramFilmoteka();
