import * as basicLightbox from 'basiclightbox';
import 'basicLightbox/src/styles/main.scss';
import searchMovie from './apiFilmFetch';
import modalTpl from '../templates/modal.hbs';
import onButtonAddToQueue from './onButtonAddToQueue';
import refs from './refs.js';

function getFilmInfo(movie_id) {
  searchMovie(movie_id).then(film => {
    const markupFilm = modalTpl(film);
    const modal = basicLightbox.create(markupFilm);
    modal.onclick = modal.show();

    //   добавление onbuttonAddToQueue
    // console.log(film);
    const buttonAddToQueueRef = document.querySelector('.modal__queue-button');
    // console.log(buttonAddToQueueRef);
    buttonAddToQueueRef.addEventListener('click', onButtonAddToQueue(film));

    window.addEventListener('keydown', closeModalByEscape);
    function closeModalByEscape(event) {
      if (event.code === 'Escape') {
        modal.close();
        //   снимаю слушатель с кнопки
        buttonAddToQueueRef.removeEventListener(
          'click',
          onButtonAddToQueue(film),
        );
      }
    }
    const crossRef = document.querySelector('.icon-close');
    crossRef.addEventListener('click', btnClosedModal);
    function btnClosedModal() {
      modal.close();
      crossRef.removeEventListener('click', btnClosedModal);
      //   снимаю слушатель с кнопки
      buttonAddToQueueRef.removeEventListener(
        'click',
        onButtonAddToQueue(film),
      );
    }
  });
}

const lightBox = () => {
  //refs.libraryList.addEventListener('click', openModal);
  refs.movieGrid.addEventListener('click', openModal);
  function openModal(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG' && event.target.nodeName !== 'H2') {
      return;
    }
    getFilmInfo(event.target.dataset.id);
  }
};

export default lightBox;
