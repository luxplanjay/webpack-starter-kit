const moviesContainerRef = document.querySelector('.movies-container-js');
const eContainerRef = document.querySelector('.error-container-js');
const pagRef = document.querySelector('.pagination-container-js');
export default function renderMovies(movies, ref, template) {
  moviesContainerRef.innerHTML = '';
  eContainerRef.innerHTML = '';
  const markup = template(movies);
  pagRef.classList.remove('is-hidden');
  ref.insertAdjacentHTML('beforeend', markup);
}
