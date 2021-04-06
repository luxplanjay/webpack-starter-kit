import movieGalleryCardTpl from '../tamplates/movie-gallery-card.hbs';
import refs from './refs.js';
import NewGetMovie from './NewGetMovie.js';
import spinner from './spinner.js';

const getMovies = new NewGetMovie();


export default function toCreateGallery() {
  spinner.spin(refs.loadSpinner);
  getMovies
    .fetchTrendingMovie()
    .then(results => {
      const markup = movieGalleryCardTpl(results);
      refs.gallery.innerHTML = markup;
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
            spinner.stop();
        });
}

toCreateGallery();
