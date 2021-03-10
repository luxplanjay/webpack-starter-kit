import fetchApi from './fetchAPIandMovieList/fetchAPI';
import localStorageUtil from './localStorage';
import renderMovies from './fetchAPIandMovieList/renderMovies';
import temp from '../template/moviesListTemplate.hbs';
import refs from './refs.js';
// const buttonQueue = document.querySelector('.button-queque');
// const buttonWatched = document.querySelector('.button-watched');

// const moviesContainerRef = document.querySelector('.movies-container-js');
// const myLibraryButton = document.querySelector('.lib-link');
refs.myLibraryButton.addEventListener('click', renderWatchedFilms);
refs.watchedBtn.addEventListener('click', renderWatchedFilms);
refs.queueBtn.addEventListener('click', renderQueueFilms);

function renderWatchedFilms() {
  refs.pagination.classList.add('is-hidden');
  let watchedFilms = localStorageUtil.getFilms('watched');
  let arrayFilms = [];
  refs.queueBtn.classList.remove('active');
  refs.watchedBtn.classList.add('active');

  refs.gallery.innerHTML = '<p>movie list watched is empty</p>';
  //refs.errorContainerRef = 'movie list watched is empty';
  watchedFilms.map(id => {
    const promId = fetchApi.getFullMovieInfo(id);
    promId.then(fullInfo => {
      arrayFilms.push(fullInfo);

      renderMovies(arrayFilms, refs.gallery, temp);
    });
  });
}
function renderQueueFilms() {
  refs.pagination.classList.add('is-hidden');
  let watchedFilms = localStorageUtil.getFilms('queue');
  let arrayFilms = [];
  refs.queueBtn.classList.add('active');
  refs.watchedBtn.classList.remove('active');

  refs.gallery.innerHTML = '<p>movie list queue is empty</p>';
  //refs.errorContainerRef = 'movie list queue is empty';
  watchedFilms.map(id => {
    const promId = fetchApi.getFullMovieInfo(id);
    promId.then(fullInfo => {
      arrayFilms.push(fullInfo);
      refs.gallery.innerHTML = '<p>movie list queue is empty</p>';

      renderMovies(arrayFilms, refs.gallery, temp);
    });
  });
}
