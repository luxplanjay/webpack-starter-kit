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

// selectedMovie.addEventListener('click', event => {
//   if (event.target.nodeName === 'LI') {
//     return;
//   }
//   showMovieModal(event.target.parentNode.dataset.id);
// });
//====================================
// selectedMovie.addEventListener('click', event => {
//   if (event) {
//     console.log(`event.target.nodeName  `, event.target.nodeName);
//     console.log(`event.target.parentNode  `, event.target.parentNode);
//     console.log(`event.currentTarget.nodeName  `, event.currentTarget.nodeName);
//     return;
//   }

//   showMovieModal(event.target.parentNode.dataset.id);
// });
//====================================
selectedMovie.addEventListener('click', event => {
  if (event.target.parentNode.nodeName === 'LI')
    showMovieModal(event.target.parentNode.dataset.id);
});
