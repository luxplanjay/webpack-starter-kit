const moviesContainerRef = document.querySelector('.movies-container-js');
const eContainerRef = document.querySelector('.error-container-js');
const pagRef = document.querySelector('.pagination-container-js');
import refs from '../refs.js';
export default function renderMovies(movies, ref, template) {
  ref = '';
  refs.errorContainerRef.innerHTML = '';
  const markup = template(movies);
  refs.pagination.classList.remove('is-hidden');
  ref.insertAdjacentHTML('beforeend', markup);
}
