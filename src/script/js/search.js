import refs from './refs';
import CONST from './settings';
import FetchSearchMovie from '../API/fetchSearchMovie';
import FetchGenre from '../API/fetchGenre';
import Pagination from './pagination-api';
import createMarkup from '../templates/galleryCard.hbs';
import _debounce from 'lodash.debounce';

const {
  searchInputRef,
  gallery,
  noResultRef,
  paginationWrapper,
  paginationPrevButton,
  paginationNextButton,
  paginationContainer,
  searchWrap,
} = refs;
const { reservImg } = CONST;

const apiSearchData = new FetchSearchMovie();
const apiGenreData = new FetchGenre();
const pagination = new Pagination();

searchInputRef.addEventListener(
  'input',
  _debounce(e => {
    let targetValue = e.target.value;
    hendlerInput(targetValue);
  }, 500),
);

function hendlerInput(e) {
  apiSearchData.query = e;
  // gallery.innerHTML = '';
  if (searchInputRef.value === '') {
    searchWrap.classList.remove('without-after-el');
    return;
  }
  searchWrap.classList.add('without-after-el');
  function createCard() {
    apiSearchData
      .fetchMovies()
      .then(res => {
        scrollWin();
        if (res === []) return;
        gallery.innerHTML = createMarkup(transformMovieObject(res.results));
        // pagination
        if (res.total_results > 20) {
          noResultRef.textContent = '';
          paginationContainer.classList.remove('visually-hidden');
          paginationPrevButton.classList.remove('hidden');
          paginationNextButton.classList.remove('hidden');
          paginationPrevButton.addEventListener('click', showPrevPage);
          paginationNextButton.addEventListener('click', showNextPage);
          paginationWrapper.addEventListener('click', showSelectedPage);
          paginationWrapper.innerHTML = pagination.renderPaginationMarkup(
            apiSearchData.page,
            res.total_results,
          );
        }
        if (res.total_results === 0 || res.total_results === '') {
          noResults();
          paginationContainer.classList.add('visually-hidden');
        }
      })
      .catch(e => console.log(e));
  }

  function noResults() {
    noResultRef.textContent =
      'Search result not successful. Enter the correct movie name and try again';
    setTimeout(function () {
      noResultRef.textContent = '';
    }, 2000);
  }

  apiSearchData.resetPage();
  createCard();

  function transformMovieObject(movies) {
    movies.forEach(elem => {
      if (elem.title.length > 38) {
        elem.title = elem.title.slice(0, 38) + '...';
      }
      elem.poster_path
        ? (elem.poster_path = `https://image.tmdb.org/t/p/w500/${elem.poster_path}`)
        : (elem.poster_path = reservImg);
      elem.release_date
        ? (elem.release_date = elem.release_date.slice(0, 4))
        : (elem.release_date = 'Unknown');
      elem.genre_ids
        ? (elem.genre_ids = apiGenreData
            .ganreTranspiler(elem.genre_ids)
            .slice(0, 3)
            .join(', '))
        : (elem.genre_ids = 'Unknown');
    });
    return movies;
  }
  const showPrevPage = () => {
    if (apiSearchData.page < 2) return;
    apiSearchData.decrementPage();
    createCard();
  };
  const showNextPage = () => {
    const activePageNumber = document.querySelector('li.active');
    if (apiSearchData.page === activePageNumber.textContent) return;
    apiSearchData.incrementPage();
    createCard();
  };
  const showSelectedPage = e => {
    if (e.target.nodeName === 'LI') {
      if (isNaN(e.target.textContent)) return;
      apiSearchData.page = e.target.textContent;
      createCard();
    }
  };
  function scrollWin() {
    window.scrollTo(0, 0);
  }
}

export default hendlerInput;
