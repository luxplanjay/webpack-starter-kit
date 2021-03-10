
// const refs = {
//   home: document.querySelector('.home-link'),
//   library: document.querySelector('.lib-link'),
//   header: document.querySelector('.header'),
//   search: document.querySelector('.form-search'),
//   buttonHeader: document.querySelector('.button-header'),
//   watchedBtn: document.querySelector('button-watched'),
//   queueBtn: document.querySelector('button-queque'),
//   gallery: document.querySelector('.movies-container'),
//   hits: document.querySelector('movie-searchTag'),
//   headerTitle: document.querySelector('.link-title'),
//   logo: document.querySelector('.logo-icon'),
// };

import refs from './refs';

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
