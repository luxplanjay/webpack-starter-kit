import fetchApi from './fetchAPIandMovieList/fetchAPI';
import localStorageUtil from './localStorage';
import renderMovies from './fetchAPIandMovieList/renderMovies';
import temp from '../template/moviesListTemplate.hbs';

const buttonQueue = document.querySelector('.button-queque');
const buttonWatched = document.querySelector('.button-watched');

const moviesContainerRef = document.querySelector('.movies-container-js');
const myLibraryButton = document.querySelector('.lib-link');
myLibraryButton.addEventListener('click', renderWatchedFilms);
buttonWatched.addEventListener('click', renderWatchedFilms);
buttonQueue.addEventListener('click', renderQueueFilms);

function renderWatchedFilms() {
  let watchedFilms = localStorageUtil.getFilms('watched');
  let arrayFilms = [];
  buttonQueue.classList.remove('active');
  buttonWatched.classList.add('active');

  moviesContainerRef.innerHTML = '<p>movie list watched is empty</p>';

  watchedFilms.map(id => {
    const promId = fetchApi.getFullMovieInfo(id);
    promId.then(fullInfo => {
      arrayFilms.push(fullInfo);

      renderMovies(arrayFilms, moviesContainerRef, temp);
    });
  });
}
function renderQueueFilms() {
  let watchedFilms = localStorageUtil.getFilms('queue');
  let arrayFilms = [];
  buttonQueue.classList.add('active');
  buttonWatched.classList.remove('active');

  moviesContainerRef.innerHTML = '<p>movie list queue is empty</p>';

  watchedFilms.map(id => {
    const promId = fetchApi.getFullMovieInfo(id);
    promId.then(fullInfo => {
      arrayFilms.push(fullInfo);
      moviesContainerRef.innerHTML = '<p>movie list queue is empty</p>';

      renderMovies(arrayFilms, moviesContainerRef, temp);
    });
  });
}
