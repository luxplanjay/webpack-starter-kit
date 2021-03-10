import modalMovieTemplate from '../template/movieModal.hbs';
import fetchAPI from '../js/fetchAPIandMovieList/fetchAPI';
import renderMovies from '../js/fetchAPIandMovieList/renderMovies.js';
import localStorageUtil from './localStorage';

const refs = {
  body: document.querySelector('body'),
  filmCard: document.querySelector('.film-card'),
  movieModal: document.querySelector('.movie-modal'),
  backdrop: document.querySelector('.backdrop'),
  // closeModalBtn: document.querySelector('.close-button'),
  movieContainer: document.querySelector('.movies-container-js'),  
};

const debounce = require('lodash.debounce');
refs.movieContainer.addEventListener('click', debounce(openModal, 100));

function openModal(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  // refs.closeModalBtn.addEventListener('click', closeModal);
    refs.movieModal.classList.remove('is-hidden');
  refs.body.classList.add('modal-overflow');
  window.addEventListener('keydown', pressEscape);
  
  refs.backdrop.addEventListener('click', closeModal);
  const fullInfoPromise = fetchAPI.getFullMovieInfo(
    event.target.dataset.movieid,
  );
  fullInfoPromise.then(fullInfo => {
    const filmsWatchedStore = localStorageUtil.getFilms('watched');
    const filmsQueuedStore = localStorageUtil.getFilms('queue');

    refs.filmCard.insertAdjacentHTML('beforeend', modalMovieTemplate(fullInfo));

    const closeModalBtn = document.querySelector('.close-button'); //+
    closeModalBtn.addEventListener('click', closeModal); //+
    
    const addToWatchCheckbox = document.querySelector('.watched-checkbox');
    const addToWatchButton = document.querySelector('.add-watched-button');
    const addToQueueCheckbox = document.querySelector('.queue-checkbox');
    const addToQueueButton = document.querySelector('.add-queue-button');

    checkAddedFilms(
      filmsWatchedStore,
      fullInfo,
      addToWatchCheckbox,
      addToWatchButton,
      'watched',
    );

    checkAddedFilms(
      filmsQueuedStore,
      fullInfo,
      addToQueueCheckbox,
      addToQueueButton,
      'queue',
    );

    addToWatchButton.onclick = event => onAddButtonClick(event, 'watched');
    addToQueueButton.onclick = event => onAddButtonClick(event, 'queue');
  });
}

function pressEscape(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}

function closeModal() {
  refs.movieModal.classList.add('is-hidden');
  refs.body.classList.remove('modal-overflow');
  window.removeEventListener('keydown', pressEscape);
  refs.filmCard.innerHTML = '';
}

function checkAddedFilms(filmsStore, filmInfo, checkbox, button, key) {
  if (filmsStore.indexOf(JSON.stringify(filmInfo.id)) === -1) {
    checkbox.checked = false;
    button.classList.remove('active');
    button.textContent = `ADD TO ${key}`;
  } else {
    checkbox.checked = true;
    button.classList.add('active');
    button.textContent = `REMOVE FROM ${key}`;
  }
}
function onAddButtonClick(event, key) {
  const { pushFilm, films } = localStorageUtil.putFilms(
    key,
    event.target.dataset.movieid,
  );
  if (pushFilm) {
    event.target.textContent = `REMOVE FROM ${key}`;
    event.target.classList.add('active');
  } else {
    event.target.textContent = `ADD TO ${key}`;
    event.target.classList.remove('active');
  }
}
