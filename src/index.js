import './sass/main.scss';
import './js/openLibrary.js';
import refs from './js/refs.js';
import homeTrending from './js/apiPopularFetch.js';
import gridTemplate from './templates/movie-grid.hbs';

homeTrending.fetchPopular().then(results => {
  const newResults = results.map(result => {
    result.release_date = result.release_date.slice(0, 4);
    result.poster_path =
      'https://image.tmdb.org/t/p/original/' + result.poster_path;
    return result;
  });
  refs.movieGrid.insertAdjacentHTML('beforeend', gridTemplate(newResults));
});
