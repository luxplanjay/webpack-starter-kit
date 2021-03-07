import './sass/main.scss';
import './js/openLibrary.js';
import refs from './js/refs.js';
import homeTrending from './js/apiPopularFetch.js';
import apiService from './js/apiSearchFetch.js';
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


///поиск по инпуту 
refs.inputForm.addEventListener('submit', event =>{
    event.preventDefault();
    const form = event.currentTarget;
    apiService.query = form.elements.query.value;

refs.movieGrid.innerHTML = " ";
form.reset(); //чистим форму 

apiService.fetchMovie().then(results => {
    const newResults = getNewResult(results);
    refs.movieGrid.insertAdjacentHTML('beforeend', gridTemplate(newResults));
  });

});

function getNewResult(results) {
    results.map(result => {
        result.release_date = result.release_date.slice(0, 4);
        result.poster_path =
          'https://image.tmdb.org/t/p/original/' + result.poster_path;
        return result;
      });
    return results;
}