const moviesContainerRef = document.querySelector('.movies-container-js');
const eContainerRef = document.querySelector('.error-container-js');
export default function renderMovies(movies, ref, template) {
  moviesContainerRef.innerHTML = '';
  eContainerRef.innerHTML = '';
  const markup = template(movies);
  ref.insertAdjacentHTML('beforeend', markup);
}
