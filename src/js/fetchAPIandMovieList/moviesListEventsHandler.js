import fetchAPI from './fetchAPI';
import debounce from 'lodash.debounce';
import renderMovies from './renderMovies.js';
import movieListTmp from '../../template/moviesListTemplate.hbs';
import renderPagination from '../pagination';
import refs from '../refs.js';
import spinner from '../spinner';
spinner.show();
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
export default async function initProgramFilmoteka() {
  spinner.show();
  let response;
  if (fetchAPI.moviesSearchActive === false) {
    response = await fetchAPI.showMoviesInTrend();
  } else if (fetchAPI.moviesSearchActive === true) {
    response = await fetchAPI.searchMovies();
  }
  if (response === undefined) {
    return;
  }
  renderPagination(response.total_results);
}
initProgramFilmoteka();
