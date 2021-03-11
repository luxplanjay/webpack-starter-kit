import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';
import searchMovie from './apiFilmFetch';
import modalTpl from '../templates/modal.hbs';
import onButtonAddToQueue from './onButtonAddToQueue';
import onButtonAddToWatched from './onButtonAddToWatched';
import refs from './refs.js';
import onButtonRemoveFromWatched from './onButtonRemoveFromWatched';
import checkButtonWatchedActive from './buttonWatchedCheckActive';
import checkButtonQueueActive from './buttonQueueCheckActive';
import { modalWatcher } from './modal-text-watcher';
import posterPlaceholder from '../img/image-placeholder-modal.jpg';

function setPosterModal(data) {
  return !data ? posterPlaceholder : `https://image.tmdb.org/t/p/w500/${data}`;
}

function getFilmInfo(movie_id) {
  searchMovie(movie_id).then(film => {
    film.poster_path = setPosterModal(film.poster_path);
    const markupFilm = modalTpl(film);
    const modal = basicLightbox.create(markupFilm);
    modal.show();
    // ===============================================
    // Проверка есть ли фильм в Watched
    const currentFilmsWatched = localStorage.getItem('filmsWatched');
    if (currentFilmsWatched) {
      let filmsArray = JSON.parse(currentFilmsWatched);
      if (filmsArray.find(({ id }) => id === film.id)) {
        const buttonAddToWatchedRef = document.querySelector(
          '.modal__watched-button',
        );
        buttonAddToWatchedRef.classList.add('active');
        buttonAddToWatchedRef.textContent = 'IN WATCHED';
      }
    }
    // Проверка есть ли фильм в Queue
    const currentFilmsQueue = localStorage.getItem('filmsQueue');
    if (currentFilmsQueue) {
      let filmsQueue = JSON.parse(currentFilmsQueue);
      if (filmsQueue.find(({ id }) => id === film.id)) {
        const buttonAddToQueueRef = document.querySelector(
          '.modal__queue-button',
        );
        buttonAddToQueueRef.classList.add('active');
        buttonAddToQueueRef.textContent = 'IN QUEUE';
      }
    }
    // ==================================================

    //   добавление onbuttonAddToQueue
    const buttonAddToQueueRef = document.querySelector('.modal__queue-button');
    buttonAddToQueueRef.addEventListener(
      'click',
      function () {
        checkButtonQueueActive(film);
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
          function () {
            checkButtonQueueActive(film);
          },
          true,
        );
        buttonAddToWatchedRef.removeEventListener(
          'click',
          function () {
            checkButtonQueueActive(film);
          },
          true,
        );
      }
    }
    const crossRef = document.querySelector('.icon-cross');
    crossRef.addEventListener('click', btnClosedModal);
    function btnClosedModal() {
      modal.close();
      crossRef.removeEventListener('click', btnClosedModal);
      //   снимаю слушатель с кнопки
      buttonAddToQueueRef.removeEventListener(
        'click',
        function () {
          checkButtonQueueActive(film);
        },
        true,
      );
      buttonAddToWatchedRef.removeEventListener(
        'click',
        function () {
          checkButtonQueueActive(film);
        },
        true,
      );
    }

    modalWatcher();
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
