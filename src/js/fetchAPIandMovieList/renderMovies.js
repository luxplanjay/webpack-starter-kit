import refs from '../refs.js';
import spinner from '../spinner';
// function sleep(milliseconds) {
//   const date = Date.now();
//   let currentDate = null;
//   do {
//     currentDate = Date.now();
//   } while (currentDate - date < milliseconds);
// }
export default function renderMovies(movies, ref, template) {
  spinner.hide();
  ref.innerHTML = '';
  refs.errorContainerRef.innerHTML = '';
  const markup = template(movies);
  refs.pagination.classList.remove('is-hidden');
  ref.insertAdjacentHTML('beforeend', markup);
}
