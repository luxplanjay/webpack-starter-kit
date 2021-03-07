import * as basicLightbox from 'basiclightbox';
import 'basicLightbox/src/styles/main.scss';
import updateModal from './updateModal';
import searchMovie from './apiFilmFetch';

function getFilmInfo(movie_id) {
  searchMovie(movie_id).then(film => {
    const cartFilm = updateModal(film);
    const modal = basicLightbox.create(cartFilm);
    modal.onclick = modal.show();
    window.addEventListener('keydown', closeModalByEscape);
    function closeModalByEscape(event) {
      if (event.code === 'Escape') {
        modal.close();
      }
    }
  });
}

const lightBox = () => {
  let cardIdRef = document.querySelector('.movie-grid');
  cardIdRef.addEventListener('click', openModal);
  function openModal(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG' && event.target.nodeName !== 'H2') {
      return;
    }
    getFilmInfo(event.target.dataset.id);
  }
};

export default lightBox;
