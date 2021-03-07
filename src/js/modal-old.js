import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basiclightbox.min.css';
import searchMovie from './searchMovie';
import updateModalMarkup from './updateModalMarkup';
//========================================

function getFilmInfo(movie_id) {
  searchMovie(movie_id).then(dataMovie => {
    const cardMovie = updateModalMarkup(dataMovie);
    const modal = basicLightbox.create(cardMovie);
  });
}

const cardIdRef = document.querySelector('#modal');
cardIdRef.addEventListener('click', openModal);
function openModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'DIV') {
    return;
  }
  const instance = basicLightbox.create(updateModalMarkup());
  instance.show();
  getFilmInfo(event.target.dataset.id);

  //=========close modal by Esc===============
  window.addEventListener('keydown', closeModal);
  function closeModal(event) {
    if (event.code === 'Escape') {
      instance.close();
      window.removeEventListener('keydown', closeModal);
    }
  }

  //=========close modal by X-button===============
  const closeBtnModal = document.querySelector('.closeModalBtn');
  closeBtnModal.addEventListener('click', closeModalBtn);
  function closeModalBtn(event) {
    instance.close();
  }
}
