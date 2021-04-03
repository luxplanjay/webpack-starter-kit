import movieGalleryCardTpl from '../tamplates/movie-gallery-card.hbs';
import refs from './refs.js';
import NewGetMovie from './NewGetMovie.js';
import spinner from './spinner.js';

const getMovies = new NewGetMovie();

// const movieCard = ({ poster_path, title, genre_ids, release_date }) => ({
//   poster_path: poster_path,
//   title: title,
//   genre_ids: genre_ids,
//   release_date: release_date.split('-')[0],
// });

function toCreateGallery() {
  spinner.spin(refs.loadSpinner);
  getMovies
    .toCreateDataList()
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
