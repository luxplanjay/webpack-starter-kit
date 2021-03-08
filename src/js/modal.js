const refs = {
  body: document.querySelector('body'),
  filmCard: document.querySelector('.film-card'),
  movieModal: document.querySelector('.movie-modal'),
  backdrop: document.querySelector('.backdrop'),
  closeModalBtn: document.querySelector('.close-button'),

  //test
  movieContainer: document.querySelector('.movies-container-js'),
  // movieContainer: document.querySelector('.moviesList-item'),
};

//test
import fetchAPI from '../js/fetchAPIandMovieList/fetchAPI';
import renderMovies from '../js/fetchAPIandMovieList/renderMovies.js';
import '../js/fetchAPIandMovieList/moviesListEventsHandler.js';
import '../js/fetchAPIandMovieList/renderMovies.js';
import '../js/fetchAPIandMovieList/fetchAPI.js';

//test
import modalMovieTemplate from '../template/movieModal.hbs';
const debounce = require('lodash.debounce');
refs.movieContainer.addEventListener('click', debounce(openModal, 100));

//test
function openModal() {
  refs.movieModal.classList.remove('is-hidden');
  refs.body.classList.add('modal-overflow');
  window.addEventListener('keydown', pressEscape);
  refs.closeModalBtn.addEventListener('click', closeModal);
  refs.backdrop.addEventListener('click', closeModal);

  // refs.filmCard.insertAdjacentHTML('beforeend', modalMovieTemplate(
  //   await fetchMovie(event.target.closest('.movies-item').getAttribute('id')),
  // ));

  //     refs.filmCard.insertAdjacentHTML('beforeend', modalMovieTemplate(
  //   getFullMovieInfo('id')),
  // ));

  const testMovieObj = {
    poster_path: '/wVbeL6fkbTKSmNfalj4VoAUUqJv.jpg',
    original_title: 'Test Total Recall',
    vote_average: '7.2',
    vote_count: '3950',
    popularity: '20.87',
    genres: 'xz',
    overview:
      'Construction worker Douglas Quaid discovers a memory chip in his brain during a virtual-reality trip. He also finds that his past has been invented to conceal a plot of planetary domination. Soon, hes off to Mars to find out who he is and who planted the chip.',
  };

  refs.filmCard.insertAdjacentHTML(
    'beforeend',
    modalMovieTemplate(testMovieObj),
  );
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
