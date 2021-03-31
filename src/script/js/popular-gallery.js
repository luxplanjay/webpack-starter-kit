import PopularFilms from '../API/fetchPopular';
import refs from '../js/refs';
import createMarkup from '../templates/galleryCard.hbs';

const fetchPopularMovie = new PopularFilms();

function createCard() {
  fetchPopularMovie.fetchPopular().then(res => {
    refs.gallery.innerHTML = createMarkup(transformMovieObject(res.results));
  });
}
createCard();

function transformMovieObject(movies) {
  movies.forEach(elem => {
    elem.release_date = elem.release_date.slice(0, 4);
    elem.genre_ids = fetchPopularMovie.ganreTranspiler(elem.genre_ids);
    elem.genre_ids = elem.genre_ids.slice(0, 3).join(', ');
  });
  return movies;
}
