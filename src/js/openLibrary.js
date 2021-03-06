import refs from './refs.js';

refs.myLibrary.addEventListener('click', openLibrary);

function openLibrary(event) {
  event.preventDefault();
  refs.home.classList.add('is-hidden');
  refs.myLibrary.classList.remove('is-hidden');
}
