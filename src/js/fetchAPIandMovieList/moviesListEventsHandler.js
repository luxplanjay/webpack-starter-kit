import fetchAPI from './fetchAPI';
import debounce from 'lodash.debounce';
import renderMovies from './renderMovies.js';
import movieListTmp from '../../template/moviesListTemplate.hbs';
import renderPagination from '../pagination';
const refs = {
  movieInputRef: document.querySelector('.movie-searchTag-js'),
  moviesContainerRef: document.querySelector('.movies-container-js'),
};
// export async function searchMovies(page = 1) {
//   refs.moviesContainerRef.innerHTML = '';
//   return fetchAPI.searchMoviesbyTag(page).then(response => {
//     renderMovies(response.results, refs.moviesContainerRef, movieListTmp);
//     //console.log(response);
//     return response;
//   });
// }

// export async function showMoviesInTrend(page = 1) {
//   //fetchAPI.resetPageToFirst();

//   refs.moviesContainerRef.innerHTML = '';
//   return fetchAPI.getTrendingMovies(page).then(response => {
//     renderMovies(response.results, refs.moviesContainerRef, movieListTmp);
//     //console.log(response);
//     return response;
//     //renderPagination(response.total_results);
//     //console.log(results);
//   });
// }

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
