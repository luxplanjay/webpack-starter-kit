import refs from '../refs.js';
export default function renderMovies(movies, ref, template) {
  ref.innerHTML = '';
  refs.errorContainerRef.innerHTML = '';
  const markup = template(movies);
  refs.pagination.classList.remove('is-hidden');
  ref.insertAdjacentHTML('beforeend', markup);
}
