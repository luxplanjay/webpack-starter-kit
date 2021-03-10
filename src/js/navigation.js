import refs from './refs';
import initProgramFilmoteka from './fetchAPIandMovieList/moviesListEventsHandler';

refs.home.addEventListener('click', activeHome);
refs.home.addEventListener('click', initProgramFilmoteka);

refs.library.addEventListener('click', activelibrary);

function activeHome(e) {
  e.preventDefault();

  refs.header.classList.replace('header-lib', 'header-home');
  refs.search.classList.remove('is-hidden');
  refs.buttonHeader.classList.add('is-hidden');
  refs.library.classList.remove('is-active');
  refs.home.classList.add('is-active');
}

function activelibrary(e) {
  e.preventDefault();

  refs.header.classList.replace('header-home', 'header-lib');
  refs.buttonHeader.classList.remove('is-hidden');
  refs.search.classList.add('is-hidden');
  refs.home.classList.remove('is-active');
  refs.library.classList.add('is-active');
  refs.pagination.classList.add('is-hidden');
}
