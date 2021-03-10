import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';
import searchMovie from './apiFilmFetch';
import modalTpl from '../templates/modal.hbs';
import onButtonAddToQueue from './onButtonAddToQueue';
import onButtonAddToWatched from './onButtonAddToWatched';
import refs from './refs.js';
import onButtonRemoveFromWatched from './onButtonRemoveFromWatched';
import checkButtonWatchedActive from './buttonCheckActive';


function  getFilmInfo(movie_id) {
  searchMovie(movie_id).then(film => {
    // console.log(film);
    const markupFilm = modalTpl(film);
    const modal = basicLightbox.create(markupFilm);
    modal.show();
    // ================

    const currentFilmsWatched = localStorage.getItem('filmsWatched');
    if (currentFilmsWatched){
      let filmsArray = JSON.parse(currentFilmsWatched);
      if (filmsArray.find(({ id }) => id === film.id)) {
        const buttonAddToWatchedRef = document.querySelector(
          '.modal__watched-button');
        buttonAddToWatchedRef.classList.add('active');
        buttonAddToWatchedRef.textContent = 'WATCHED';
            
      }
    }
     // ================

    //   добавление onbuttonAddToQueue
    const buttonAddToQueueRef = document.querySelector('.modal__queue-button');
    buttonAddToQueueRef.addEventListener(
      'click',
      function () {
        onButtonAddToQueue(film);
      },
      false,
    );

    // AddToWatched button

    const buttonAddToWatchedRef = document.querySelector(
      '.modal__watched-button',
    );
    console.log(buttonAddToWatchedRef);

    // Listener to click

    buttonAddToWatchedRef.addEventListener(
      'click',
      function () {
        checkButtonWatchedActive(film);
      },
      false,
    );

    window.addEventListener('keydown', closeModalByEscape);
    function closeModalByEscape(event) {
      if (event.code === 'Escape') {
        modal.close();
        window.removeEventListener('keydown', closeModalByEscape);
        //   снимаю слушатель с кнопки
        buttonAddToQueueRef.removeEventListener(
          'click',
          onButtonAddToQueue(film),
        );

        buttonAddToWatchedRef.removeEventListener(
          'click',
          onButtonAddToWatched(film),
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
      buttonAddToWatchedRef.removeEventListener(
        'click',
        onButtonAddToWatched(film),
      );
    }
  });
}

const lightBox = () => {
refs.libraryList.addEventListener('click', openModal);
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
