export default function renderMovies(movies, ref, template) {
  const markup = template(movies);
  ref.insertAdjacentHTML('beforeend', markup);
}
