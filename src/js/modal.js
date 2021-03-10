import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basiclightbox.min.css';
import { fetchInfoFilm } from './apiService';

const selectedMovie = document.querySelector('.image-slider');

const showMovieModal = async movieId => {
  const movieMarkup = await fetchInfoFilm(movieId);
  const modal = basicLightbox.create(movieMarkup, {
    onShow: instance => {
      instance.element().querySelector('.closeModalBtn').onclick =
        instance.close;
    },
  });
  modal.show();
  window.addEventListener('keydown', closeModal);
  function closeModal(event) {
    if (event.code === 'Escape') {
      modal.close();
      window.removeEventListener('keydown', closeModal);
    }
  }
};

selectedMovie.addEventListener('click', () =>
  showMovieModal(event.target.dataset.id),
);
