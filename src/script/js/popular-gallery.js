import PopularFilms from '../API/fetchPopular';
import refs from '../js/refs';
import createMarkup from '../templates/galleryCard.hbs';
import Pagination from './pagination-api';

const fetchPopularMovie = new PopularFilms();
const pagination = new Pagination();

function createCard() {
  fetchPopularMovie.fetchPopular().then(res => {
    scrollWin();
    refs.gallery.innerHTML = createMarkup(transformMovieObject(res.results));
    // pagination
    if (res.total_results > 20) {
      refs.paginationPrevButton.classList.remove('hidden');
      refs.paginationNextButton.classList.remove('hidden');
      refs.paginationPrevButton.addEventListener('click', showPrevPage);
      refs.paginationNextButton.addEventListener('click', showNextPage);
      refs.paginationWrapper.addEventListener('click', showSelectedPage);
      refs.paginationWrapper.innerHTML = pagination.renderPaginationMarkup(
        fetchPopularMovie.page,
        res.total_results,
      );
    }
  });
}
fetchPopularMovie.resetPage();
createCard();

function transformMovieObject(movies) {
  movies.forEach(elem => {
    elem.release_date = elem.release_date.slice(0, 4);
    elem.genre_ids = fetchPopularMovie.ganreTranspiler(elem.genre_ids);
    elem.genre_ids = elem.genre_ids.slice(0, 3).join(', ');
  });
  return movies;
}
const showPrevPage = () => {
  if (fetchPopularMovie.page < 2) return;
  fetchPopularMovie.decrementPage();
  createCard();
};
const showNextPage = totalResults => {
  const activePageNumber = document.querySelector('li.active');
  if (fetchPopularMovie.page === activePageNumber.textContent) return;
  fetchPopularMovie.incrementPage();
  createCard();
};
const showSelectedPage = e => {
  if (e.target.nodeName === 'LI') {
    if (isNaN(e.target.textContent)) return;
    fetchPopularMovie.page = e.target.textContent;
    createCard();
  }
};
function scrollWin() {
  window.scrollTo(0, 0);
}