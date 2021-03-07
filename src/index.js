import './sass/main.scss';
import './js/openLibrary.js';
import refs from './js/refs.js';
import homeTrending from './js/apiPopularFetch.js';
import gridTemplate from './templates/movie-grid.hbs';
import lightbox from './js/modalFilmMarkup';
import { processingSpinner, deleteSpinner } from './js/spinner-loader';

processingSpinner();
function genresFilter(data, genreIds) {
  const filtredData = data.filter(genre =>
    genreIds.find(genreId => genre.id === genreId),
  );
  return setGenresString(filtredData);
}
function setGenresString(genresArray) {
  const reqGenres = [];
  genresArray.map(res => reqGenres.push(` ${res.name}`));
  reqGenres.toString().trim();
  return reqGenres;
}
homeTrending.fetchGenres().then(genresData => {
  homeTrending.fetchPopular().then(results => {
    const newResults = results.map(result => {
      result.release_date = result.release_date.slice(0, 4);
      result.poster_path =
        'https://image.tmdb.org/t/p/original/' + result.poster_path;
      result.genre_ids = genresFilter(genresData, result.genre_ids);
      return result;
    });
    deleteSpinner();
    refs.movieGrid.insertAdjacentHTML('beforeend', gridTemplate(newResults));
    lightbox();
  });
});
