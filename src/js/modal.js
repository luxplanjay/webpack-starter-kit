import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basiclightbox.min.css';
import { fetchInfoFilm } from './apiService';
import modalTpl from '../templates/modal.hbs';
import local from './local';
const selectedMovie = document.querySelector('.image-slider');

const showMovieModal = async movieId => {
  const movieMarkup = await fetchInfoFilm(movieId, modalTpl);
  const modal = basicLightbox.create(movieMarkup, {
    onShow: instance => {
      const watchedBtn = instance
        .element()
        .querySelector('.modal-info__btn-watched');
      instance.element().querySelector('.closeModalBtn').onclick =
        instance.close;
      if (local.arrayWatchedFilms.includes(movieId)) {
        watchedBtn.innerText = 'REMOVE FROM WATCHED';
        watchedBtn.classList.add('modal-info__btn-watched--active');
      }
      watchedBtn.onclick = () => {
        local.addWatchedFilms(movieId);
        console.log(local.arrayWatchedFilms);
        if (watchedBtn.classList.contains('modal-info__btn-watched--active')) {
          watchedBtn.innerText = 'ADD TO WATCHED';
          watchedBtn.classList.remove('modal-info__btn-watched--active');
          return;
        }
        watchedBtn.innerText = 'REMOVE FROM WATCHED';
        watchedBtn.classList.add('modal-info__btn-watched--active');
      };

      //
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

selectedMovie.addEventListener('click', event => {
  if (event.target.parentNode.nodeName === 'LI')
    showMovieModal(event.target.parentNode.dataset.id);
});
