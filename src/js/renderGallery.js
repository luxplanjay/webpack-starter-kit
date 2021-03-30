import movieGalleryCardTpl from '../tamplates/movie-gallery-card.hbs';
import refs from './refs.js';
import NewGetMovie from './NewGetMovie.js'

const getMovies = new NewGetMovie();


function toCreateGallery() {
  getMovies
    .fetchTrendingMovie()
    .then(results => {
      const markup = movieGalleryCardTpl(results);
      refs.gallery.innerHTML = markup;
    })
    .catch(error => {
      console.log(error);
    });
}

toCreateGallery();
